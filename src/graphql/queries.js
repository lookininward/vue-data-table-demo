// eslint-disable
// this is an auto generated file. This will be overwritten

export const getItem = `query GetItem($id: ID!) {
  getItem(id: $id) {
    id
    name
    description
    date
    amount
  }
}
`;
export const listItems = `query ListItems(
  $filter: TableItemFilterInput
  $limit: Int
  $nextToken: String
) {
  listItems(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      name
      description
      date
      amount
    }
    nextToken
  }
}
`;
