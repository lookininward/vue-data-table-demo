// eslint-disable
// this is an auto generated file. This will be overwritten

export const onCreateItem = `subscription OnCreateItem(
  $id: ID
  $name: String
  $description: String
  $date: String
  $amount: Float
) {
  onCreateItem(
    id: $id
    name: $name
    description: $description
    date: $date
    amount: $amount
  ) {
    id
    name
    description
    date
    amount
  }
}
`;
export const onUpdateItem = `subscription OnUpdateItem(
  $id: ID
  $name: String
  $description: String
  $date: String
  $amount: Float
) {
  onUpdateItem(
    id: $id
    name: $name
    description: $description
    date: $date
    amount: $amount
  ) {
    id
    name
    description
    date
    amount
  }
}
`;
export const onDeleteItem = `subscription OnDeleteItem(
  $id: ID
  $name: String
  $description: String
  $date: String
  $amount: Float
) {
  onDeleteItem(
    id: $id
    name: $name
    description: $description
    date: $date
    amount: $amount
  ) {
    id
    name
    description
    date
    amount
  }
}
`;
