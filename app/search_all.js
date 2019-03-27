import elasticsearch from "elasticsearch";

const esClient = new elasticsearch.Client({
  host: "127.0.0.1:9200",
  log: "error"
});

export const searchAll = queryStr => {
  // search body parameters
  let body = {
    size: 5,
    from: 0,
    query: {
      multi_match: {
        query: queryStr,
        fields: ["text", "user_id^2", "created_at"],
        fuzziness: 2
      }
    }
  };

  const search = function search(index, body) {
    return esClient.search({ index: index, body: body });
  };

  return search("library", body);
};
