class ListItems extends React.Component{
    constructor(){
        super()
    }
    render(){
        let list = this.props.list.map((item, index)=>{
            return <li key={index}>{item}</li>
        })

        return(
            <ul>
                {list}
            </ul>
    )};
}
class List extends React.Component {
  constructor(){
    super()

    this.state = {
      word:"",
      list : []
    }
  }

  addItem(){
    console.log('adding item');
    let word = this.state.word;
    console.log("word:", word);
    let list = this.state.list.concat(word)
    console.log("list:", list);
    this.setState({list: list});
    this.setState({word: ""});
  }

  changeHandler(){
    let input = event.target.value;
    console.log('input:', input)
    let word = this.state.word;
    word = input;
    this.setState({word: word});
  }



  render() {
      // render the list with a map() here

      console.log("rendering");
      return (
        <div className="list">
          <input onChange={()=>{this.changeHandler()}} value={this.state.word}/>
          <button onClick={()=>{this.addItem()}}>add item</button>
          <ListItems list={this.state.list}/>
        </div>
      );
  }
}

ReactDOM.render(
    <List/>,
    document.getElementById('root')
);