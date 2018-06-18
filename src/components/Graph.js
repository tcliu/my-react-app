import React, { Component } from 'react';
import vis from 'vis'
import _ from 'lodash'
import './Graph.css'
import { buildGraph } from '../services/GraphBuilder'


class Graph extends Component {
  constructor(props) {
    super(props)
    this.ref = React.createRef()
  }

  buildVisGraph(obj) {
    const graph = _.cloneDeep(buildGraph(obj))
    console.log(graph)
    graph.nodes.forEach(node => {
      node.label = node.name
    })
    graph.edges.forEach(edge => {
      edge.from = edge.from.id
      edge.to = edge.to.id
      edge.label = edge.rel
    })
    return graph
  }

  componentDidMount() {
    if (this.props.data) {
      // create a network
      const graph = this.buildVisGraph(this.props.data)
      const container = this.ref.current
      const data = Object.assign({
        height: '100%',
        width: '100%'
      }, graph)

      const options = {
        nodes: {
          shape: 'circle',
          color: {
            background: '#c5dcfc'
          }
        },
        edges: {
          arrows: 'to'
        },
        physics: {
          enabled: false
        }

      };
      const network = new vis.Network(container, data, options);
      network.on('click', params => {
        console.log('clicked', params)
      })
    }
  }

  render() {
    return <div id="my-graph" className="Graph" ref={this.ref} />
  }

}

export default Graph