import { GraphiQL } from 'graphiql';
import 'graphiql/style.css';

async function fetcher(graphQLParams) {
  const response = await fetch('/graphql', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(graphQLParams),
  });
  return response.json();
}

const query = /* GraphQL */`
  { 
    # look ma, no selection set!
    pageLayout(page: "foo")
  }
`.trim();

function App() {
  return <GraphiQL fetcher={fetcher} defaultQuery={query} initialQuery={query} />;
}

export default App;
