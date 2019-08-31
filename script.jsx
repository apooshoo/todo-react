class ListItems extends React.Component{

    deleteItem(index){
        this.props.deleteItem(index);
    }

    timeSince(item){
        return moment(item.created_at).fromNow();
    }

    render(){
        let list = this.props.list.map((item, index)=>{
            return(
                <li key={index} onClick={() => {this.deleteItem(index)}}>Text: {item.text} Posted: {this.timeSince(item)}</li>
             )
        });

        return(
            <ul>
                {list}
            </ul>
    )};
}

class DeletedItems extends React.Component{
    timeSince(item){
        return moment(item.updated_at).fromNow();
    }
    render(){
        let deleteList = this.props.deleteList.map((item, index) => {
            return <li key={index}>Text: {item.text} Deleted: {this.timeSince(item)}</li>
        });
        return(
            <ul>
                {deleteList}
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
      deleteList: [],
      error: ""
    }
  }

  deleteItem(index){
    console.log('deleting item!');
    console.log('item index', index);

    let deleteList = this.state.deleteList;

    let list = [...this.state.list];
    //^^ copy state

    console.log("pushing into deletelist", list[index])
    deleteList = deleteList.concat(list[index])
    this.setState({deleteList: deleteList})
    console.log("deletelist after", this.state.deletelist)
    // ^^history insert

    list.splice(index, 1);
    //^^ delete

    this.setState({list: list});
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
          <p>Items Count: {this.state.list.length}</p>
          <ListItems deleteItem={(index)=>{this.deleteItem(index)}} list={this.state.list}/>
          <p>Deleted Items Count: {this.state.deleteList.length}</p>
          <DeletedItems deleteList={this.state.deleteList}/>
        </div>
      );
  }
}

ReactDOM.render(
    <List/>,
    document.getElementById('root')
);