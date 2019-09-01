class ListItems extends React.Component{

    editItem(event, index){
        this.props.editItem(event, index);
    }

    deleteItem(index){
        this.props.deleteItem(index);
    }

    timeSinceCreated(item){
        return moment(item.created_at).fromNow();
    }

    timeSinceUpdated(item){
        return moment(item.updated_at).fromNow();
    }

    fillCheckBox(event, index){
        this.props.fillCheckBox(event, index);
    }


    render(){
        let list = this.props.list.map((item, index)=>{
            return(
                <li className="list-group-item col-4 offset-2 w-100" key={index}>
                    <small className="w-100">Updated: {this.timeSinceUpdated(item)}</small>
                    <div className="row">
                        <img className="col-2 checkbox" onClick={()=>{this.fillCheckBox(event, index)}} src="checkbox-regular-24.png"/>
                        <input className="col-8" value={item.text} onChange={() => {this.editItem(event, index)}}></input>
                        <img className="col-2 delete-icon" onClick={() => {this.deleteItem(index)}} src="trash-regular-24.png"></img>
                    </div>
                    <div className="row">
                        <small className="col offset-2">{item.error}</small>
                    </div>
                </li>
             )
        });

        return(
            <ul className="list-group row">
                {list}
            </ul>
    )};
}

class DeletedItems extends React.Component{
    timeSinceUpdated(item){
        return moment(item.updated_at).fromNow();
    }

    fillCheckBox(event, item){
        let checkBox = event.target;
        if(item.done === false){
            return 'checkbox-checked-regular-24.png';
        } else{
            return 'checkbox-regular-24.png';
        }
    }

    render(){
        let deleteList = this.props.deleteList.map((item, index) => {
            return (
                <li className="list-group-item col-4 offset-2 w-100" key={index}>
                    <small className="w-100">Deleted: {this.timeSinceUpdated(item)}</small>
                    <div className="row">
                        <img className="col-2 checkbox" src={this.fillCheckBox(event, item)}/>
                        <p className="col-8">{item.text}</p>
                    </div>
                </li>
                )
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
        updated_at: null,
        error: null
      },
      list : [],
      deleteList: [],
      error: ""
    }
  }

  fillCheckBox(event, index){
    let checkBox = event.target;
    console.log("checkbox:", event.target)
    let list = [...this.state.list];
    let item = list[index];
    console.log('item to edit:', item);
    if(item.done === false){
        console.log('checking!');
        checkBox.setAttribute('src', 'checkbox-checked-regular-24.png');
        item.done =true;
        this.setState({list: list});
    } else{
        console.log('unchecking!');
        checkBox.setAttribute('src', 'checkbox-regular-24.png');
        item.done = false;
        this.setState({list: list});
    };
  }

  editItem(event, index){
    console.log('editing item!');
    console.log('edited text:', event.target.value);
    let list = [...this.state.list];
    let item = list[index];
    console.log('item to save to:', item);
    if(event.target.value.length <= 10){
        item.error = null;
        item.text = event.target.value;
        this.setState({list: list});
        console.log('text after edit:', this.state.list[index].text);
    }else{
        item.error = "error: max chars: 10!";
        this.setState({list: list});
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
        updated_at: null,
        error: null
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
        <div className="everything-container">
            <div className="form row mt-5 w-100">
                <input className="col-4 offset-3" onChange={()=>{this.changeHandler()}} value={this.state.item.text}/>
                <button className="col-1" onClick={()=>{this.addItem()}}>add item</button>
            </div>
            <div className="error row">
                <p className="col-4 offset-3">{this.state.error}</p>
            </div>

            <div className="list">
                <p>Items Count: {this.state.list.length}</p>
                <ListItems deleteItem={(index)=>{this.deleteItem(index)}} editItem={(event, index)=>{this.editItem(event, index)}} fillCheckBox={(event, index)=>{this.fillCheckBox(event, index)}} list={this.state.list}/>
            </div>

            <div className="deleted-list">
                <p>Deleted Items Count: {this.state.deleteList.length}</p>
                <DeletedItems deleteList={this.state.deleteList}/>
            </div>
        </div>
      );
  }
}

ReactDOM.render(
    <List/>,
    document.getElementById('root')
);