class ListItems extends React.Component{

    deleteItem(item){
        this.props.deleteItem(item);
    }

    timeSince(item){
        return moment(item.created_at).fromNow();
    }

    render(){
        let list = this.props.list.map((item, index)=>{
            return(
                <li key={index} index={index} onClick={() => {this.deleteItem(event.target.attributes)}}>Text: {item.text} Posted: {this.timeSince(item)}</li>
             )
        });

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
      item: {
        text: "",
        done: null,
        created_at: null,
        updated_at: null
      },
      list : [],
      error: ""
    }
  }

  deleteItem(item){
    console.log('deleting item!');
    console.log(item.index);
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
    let item = this.state.item;
    console.log("item:", item);
    let list = this.state.list.concat(item)
    console.log("list:", list);
    this.setState({list: list});
    this.setState({item: {
        text: "",
        done: null,
        created_at: null,
        updated_at: null
      }});
  }

  changeHandler(){
    let input = event.target.value;
    console.log('input:', input)
    let item = this.state.item;
    item = {
        text: input,
        done: false,
        created_at: moment().format(),
        updated_at: moment().format()
    };
    if(item.text.length<=10){
        this.setState({item: item});
    } else {
        this.setState({error: "error: max chars: 10"})
    };
  }

  componentDidUpdate(){
    console.log("state:", this.state);
  }


  render() {
      console.log(moment().format())
      return (
        <div className="list">
          <input onChange={()=>{this.changeHandler()}} value={this.state.item.text}/>
          <button onClick={()=>{this.addItem()}}>add item</button>
          <p>{this.state.error}</p>
          <ListItems deleteItem={(item)=>{this.deleteItem(item)}} list={this.state.list}/>
        </div>
      );
  }
}

ReactDOM.render(
    <List/>,
    document.getElementById('root')
);