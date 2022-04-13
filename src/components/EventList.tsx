import { CellClickEventArgs } from "@syncfusion/ej2-react-schedule";
import {
  DragAndDropEventArgs,
  TreeViewComponent,
  NodeSelectEventArgs,
} from "@syncfusion/ej2-react-navigations";
import {
  MaskedTextBoxComponent,
  ChangeEventArgs,
} from "@syncfusion/ej2-react-inputs";
import { ScheduleComponent } from "@syncfusion/ej2-react-schedule";
import { DataManager, Query, Predicate } from "@syncfusion/ej2-data";

// Define your component props
type EventListProps = {
  scheduleObj: ScheduleComponent;
  treeViewData: any;
};

const EventList: React.FC<EventListProps> = ({ treeViewData, scheduleObj }) => {
  let treeObj: TreeViewComponent;
  let maskObj: MaskedTextBoxComponent;

  const field: Object = {
    dataSource: treeViewData,
    id: "id",
    text: "name",
    parentID: "pid",
    hasChildren: "hasChild",
    expanded: "expanded",
  };

  const onTreeDragStop = (args: DragAndDropEventArgs): void => {
    if (args.target.classList.contains('e-work-cells')) {
      let cellData: CellClickEventArgs = scheduleObj.getCellDetails(args.target);
      let eventData: { [key: string]: Object } = {
        Id: new Date().getTime(),
        Subject: args.draggedNodeData.text,
        StartTime: cellData.startTime,
        EndTime: cellData.endTime,
        IsAllDay: cellData.isAllDay,
      };
      scheduleObj.addEvent(eventData);
    }
    else{
      args.cancel = true;
    }

  };

  const onTreeDragStart = (args: DragAndDropEventArgs): void => {
    if (args.draggedNodeData.parentID == null) {
      args.cancel = true;
    }
  };

  //Change the dataSource for TreeView
  const changeDataSource = (data: any) => {
    treeObj.fields = {
      dataSource: data,
      id: "id",
      text: "name",
      parentID: "pid",
      hasChildren: "hasChild",
    };
  };

  //Filtering the TreeNodes
  const searchNodes = (args: ChangeEventArgs) => {
    let _text = maskObj.element.value;
    let predicates = [],
      _array = [],
      _filter = [];
    if (_text == "") {
      changeDataSource(treeViewData);
    } else {
      let predicate = new Predicate("name", "contains", _text, true);
      let filteredList: any = new DataManager(treeViewData).executeLocal(
        new Query().where(predicate)
      );
      for (let j = 0; j < filteredList.length; j++) {
        _filter.push(filteredList[j]["id"]);
        let filters = getFilterItems(filteredList[j], treeViewData);
        for (let i = 0; i < filters.length; i++) {
          if (_array.indexOf(filters[i]) == -1 && filters[i] != null) {
            _array.push(filters[i]);
            predicates.push(new Predicate("id", "equal", filters[i], false));
          }
        }
      }
      if (predicates.length == 0) {
        changeDataSource([]);
      } else {
        let query = new Query().where(Predicate.or(predicates));
        let newList: any = new DataManager(treeViewData).executeLocal(query);
        changeDataSource(newList);
        let proxy: any = treeObj as TreeViewComponent;
        setTimeout(function (this: any) {
          proxy.expandAll();
        }, 100);
      }
    }
  };

  //Find the Parent Nodes for corresponding childs
  const getFilterItems = (fList: any, list: any): any => {
    let nodes = [];
    nodes.push(fList["id"]);
    let query2 = new Query().where("id", "equal", fList["pid"], false);
    let fList1 = new DataManager(list).executeLocal(query2);
    if (fList1.length != 0) {
      let pNode: any = getFilterItems(fList1[0], list);
      for (let i = 0; i < pNode.length; i++) {
        if (nodes.indexOf(pNode[i]) == -1 && pNode[i] != null)
          nodes.push(pNode[i]);
      }
      return nodes;
    }
    return nodes;
  };

  const nodeSelect = (args: NodeSelectEventArgs): void => {
    if (args.node.classList.contains("e-level-1")) {
      treeObj.collapseAll();
      treeObj.expandAll([args.node]);
      treeObj.expandOn = "None";
    }
  };

  const onClicky = (args: any): void => {
    args.cancel = true;
  };

  return (
    <>
      <div className="treeview-component-search-area">
        <MaskedTextBoxComponent
          placeholder="Search..."
          ref={(mask) => {
            maskObj = mask as MaskedTextBoxComponent;
          }}
          change={searchNodes}
        />
      </div>

      <div className="treeview-component-list-area">
        <TreeViewComponent
          fields={field}
          allowDragAndDrop={true}
          cssClass="accordiontree"
          nodeDragStop={onTreeDragStop}
          nodeDragStart={onTreeDragStart}
          nodeSelected={nodeSelect}
          allowTextWrap={true}
          onClick={onClicky}
          ref={(treeView) => {
            treeObj = treeView as TreeViewComponent;
          }}
        />
      </div>
    </>
  );
};

export default EventList;
