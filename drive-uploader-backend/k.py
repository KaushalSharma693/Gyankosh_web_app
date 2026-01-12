from flask import Flask, request, jsonify
from flask_cors import CORS
import cloudinary
import cloudinary.uploader
from pymongo import MongoClient
import os
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)

CORS(app, resources={r"/*": {"origins": "*"}})

@app.after_request
def after_request(response):
    response.headers.add("Access-Control-Allow-Origin", "*")
    response.headers.add("Access-Control-Allow-Headers", "Content-Type,Authorization")
    response.headers.add("Access-Control-Allow-Methods", "GET,POST,DELETE,OPTIONS")
    return response


# Cloudinary config
cloudinary.config(
  cloud_name=os.getenv("CLOUDINARY_CLOUD_NAME"),
  api_key=os.getenv("CLOUDINARY_API_KEY"),
  api_secret=os.getenv("CLOUDINARY_API_SECRET")
)

# MongoDB
client = MongoClient(os.getenv("MONGO_URI"))
db = client.library
books = db.books


def normalize(title):
    return title.lower().replace(" ", "_")


# Upload PDF
@app.route("/upload", methods=["POST"])
def upload():
    title = request.form.get("title")
    pdf = request.files.get("image")

    if not title or not pdf:
        return jsonify({"error": "Title & PDF required"}), 400

    if not pdf.filename.lower().endswith(".pdf"):
        return jsonify({"error": "Only PDF allowed"}), 400

    norm = normalize(title)

    if books.find_one({"normalized_title": norm}):
        return jsonify({"error": "Book already exists"}), 409

    upload = cloudinary.uploader.upload(
    pdf,
    resource_type="raw",
    folder="books",
    public_id=norm,
    use_filename=True,
    unique_filename=False,
    overwrite=False,
    format="pdf"
)


    pdf_url = upload["secure_url"] + "?filename=" + norm + ".pdf"
   # ← this is correct

    book = {
        "title": title,
        "normalized_title": norm,
        "cloudinary_id": upload["public_id"],
        "pdf_url": pdf_url
    }

    result = books.insert_one(book)
    book["_id"] = str(result.inserted_id)
    return jsonify(book), 201




# Fetch books
@app.route("/books", methods=["GET"])
def get_books():
    data = list(books.find({}, {"_id": 0}))
    return jsonify(data)


# Delete book
@app.route("/books/<title>", methods=["DELETE"])
def delete_book(title):
    norm = normalize(title)
    book = books.find_one({"normalized_title": norm})
    if not book:
        return jsonify({"error": "Not found"}), 404

    cloudinary.uploader.destroy(book["cloudinary_id"], resource_type="raw")
    books.delete_one({"normalized_title": norm})

    return jsonify({"message": "Deleted"})


if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))
    app.run(host="0.0.0.0", port=port)