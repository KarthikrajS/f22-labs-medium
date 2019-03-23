import React from 'react';
import Item from './item';

class List extends React.Component {

    render() {
        const {itemArray,clearList,handleDelete,handleComplete,currentSelect,handleEdit,selectedItem,togglePopup} = this.props;

        return (
                <ul className="list-group my-5">
                    {
                        itemArray.map(item =>{
                        return <Item iden={item.id} key={item.id} title={item.title}
                                     complete={item.complete}
                                     selectedItem={selectedItem ===item.id}
                                     togglePopup={()=>togglePopup(item.id)}
                                     handleDelete={() => handleDelete(item.id)}
                                     handleComplete={() => handleComplete(item.id)}
                                     currentSelect={() => currentSelect(item.id)}
                                     handleEdit={()=>handleEdit(item.id)}
                        />;
                    })
                    }
                    {itemArray.length === 0 ?'': <button type="button" className="btn btn-danger btn-block text-capitalize mt-5" onClick={clearList}>clear list</button>}
                </ul>

        )
    }
}

export default List;
