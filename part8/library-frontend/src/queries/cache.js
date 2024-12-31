
export const updateCache = (cache, query, addedBook) => {
 
    const uniqByTitle = (a) => {
        let seen = new Set()
        return a.filter((item) => {
            let k = item.title
            return seen.has(k) ? false : seen.add(k)
        })
    }

    const possible_genres = addedBook.genres.concat(null); // null is added to update all books retrived in cache
      possible_genres.map((genre) => {
        cache.updateQuery(
          { ...query , variables: { genre: genre } },
          (data) => {
            return data
              ? {
                  allBooks: uniqByTitle(data.allBooks.concat(addedBook)),
                }
              : undefined; // do not update if not in cache?? will be fetched once genre button is clicked!
          }
        );
      });
}