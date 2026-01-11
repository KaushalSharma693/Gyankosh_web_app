import React from 'react';
import BookDetails from './BookDetails';

const ShelfBooks = ({ books, onSave, savedTitles }) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
      {books.map((book) => {
        const info = book.volumeInfo;
        const title = info.title || 'Untitled';
        const author = info.authors?.[0] || 'Unknown Author';
        const coverUrl = info.imageLinks?.thumbnail || 'https://via.placeholder.com/150x220?text=No+Cover';
        const previewLink = info.previewLink || '#';

        const isSaved = savedTitles?.has?.(title.toLowerCase());

        return (
          <BookDetails
            key={book.id}
            title={title}
            author={author}
            coverUrl={coverUrl}
            previewLink={previewLink}
            bookId={book.id}
            onSave={onSave}
            isSaved={isSaved}
          />
        );
      })}
    </div>
  );
};

export default ShelfBooks;
