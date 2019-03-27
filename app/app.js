import { searchAll } from "./search_all";
import React from "react";
import { render, Box, Text } from "ink";
import TextInput from "ink-text-input";

class SearchQuery extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      query: "",
      results: {}
    };
  }

  render() {
    return (
      <Box flexDirection="column">
        <Box marginRight={1}>Enter your query:</Box>

        <TextInput value={this.state.query} onChange={this.handleChange} />
        <Box flexDirection="column">
          <Text bold underline>
            Results:
          </Text>
          <Text>
            Total:{" "}
            {this.state.results.hits ? this.state.results.hits.total : "N/A"}
          </Text>
          <Text>Top hits:</Text>

          {this.state.results.hits &&
            this.state.results.hits.hits.map(hit => {
              return (
                <Box marginTop={1}>
                  {JSON.stringify({
                    id: hit._id,
                    score: hit._score,
                    text: hit._source.text,
                    user_id: hit._source.user_id,
                    created_at: hit._source.created_at
                  })}
                </Box>
              );
            })}
        </Box>

        <Box marginTop={2}>
          <Text bold underline>
            Raw Results:
          </Text>
          <Text>
            {JSON.stringify(
              this.state.results.hits
                ? {
                    ...this.state.results,
                    hits: {
                      ...this.state.results,
                      hits: this.state.results.hits.hits.map(hit => {
                        return { ...hit, _source: "..." };
                      })
                    }
                  }
                : {}
            )}
          </Text>
        </Box>
      </Box>
    );
  }

  handleChange = query => {
    this.setState({ query });
    searchAll(query)
      .then(results => {
        this.setState({ results });

        //console.log({ hits: results.hits.hits });
        //this.setState({ hits: results.hits.hits });
      })
      .catch(console.error);
  };
}

render(<SearchQuery />);
// ./node_modules/@babel/node/bin/babel-node.js app.js
// app.get("/:q", function(req, res) {
//   elSearch
//     .searchAll(req.params.q)
//     .then(results => {
//       res.send(results.hits.hits);
//     })
//     .catch(console.error);
// });

// app.listen(3000, function() {
//   console.log("Tweet Search app listening on port 3000!");
// });
