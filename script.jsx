class ListItems extends React.Component{
    constructor(){
        super()
    }

    // test(){
    //     console.log('testing')
    //     console.log(event.target)
    //     console.log(event.key)
    // }
    render(){
        let list = this.props.list.map((item, index)=>{
            return <li key={index} index={index} onClick={() => {this.props.deleteItem(event.target.attributes)}}>{item}</li>
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

  deleteItem(item){
    console.log('deleting item!')
    console.log(item.index)
    let list = [...this.state.list];
    //^^ spread syntax
    console.log("list before delete", list);
    //^^ copy state

    list.splice(item.index, 1);
    console.log("list after delete", list);
    //^^ delete

    this.setState({list: list});
    // console.log("result:", this.state.list);
    //^^ save



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
    if(word.length<=10){
        this.setState({word: word});
    } else {
        alert("max limit 10 reached");
    };
  }

  componentDidUpdate(){
    console.log("state:", this.state);
  }


  render() {
      console.log("rendering");
      return (
        <div className="list">
          <input onChange={()=>{this.changeHandler()}} value={this.state.word}/>
          <button onClick={()=>{this.addItem()}}>add item</button>
          <ListItems deleteItem={(item)=>{this.deleteItem(item)}} list={this.state.list}/>
        </div>
      );
  }
}

ReactDOM.render(
    <List/>,
    document.getElementById('root')
);