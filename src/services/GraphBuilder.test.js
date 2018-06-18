import { buildGraph } from './GraphBuilder.js'

const names = [
  'Ada', 'Ann', 'Bob', 'Cathy', 'Clara', 'Charles', 'Doris',
  'Danny', 'Felton', 'Felix', 'George', 'Iris', 'Jack', 'Ken',
  'Lauren', 'Martin', 'Noel', 'Olivia', 'Peter', 'Rachel',
  'Sunny', 'Tim', 'Tiffany', 'Vince', 'Wilson', 'Wendy',
  'Xavier', 'Yvonne', 'Zoe'
]

it('can output correct graph', () => {
  const persons = names.map(name => ({name: name, friends: []}))
  persons.forEach(p => {
    persons.forEach(p2 => {
      if (p.name !== p2.name) {
        p.friends.push(p2)
      }
    })
  })
  const graph = buildGraph(persons)
  expect(graph.nodes.length).toEqual(names.length)
  expect(graph.edges.length).toEqual((names.length - 1) * names.length)
})
