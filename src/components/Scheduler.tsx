import {
  Inject,
  ScheduleComponent,
  Week,
  ViewsDirective,
  ViewDirective,
  DragAndDrop,
  Resize,
} from "@syncfusion/ej2-react-schedule";
import { Internationalization } from "@syncfusion/ej2-base";

// Define your component props
type SchedulerProps = {
  setScheduleObj: (scheduleObj: ScheduleComponent) => void;
};

const Scheduler: React.FC<SchedulerProps> = ({ setScheduleObj }) => {
  const instance: Internationalization = new Internationalization();
  let scheduleRef: ScheduleComponent;
  const getDateHeaderText = (value: Date): string => {
    return instance.formatDate(value, { skeleton: "E" });
  };

  const dateHeaderTemplate = (props: any): JSX.Element => {
    return (
      <div>
        <div
          style={{ fontSize: "1rem", fontWeight: "bold", textAlign: "center" }}
        >
          {getDateHeaderText(props.date)}
        </div>
      </div>
    );
  };

  const onClicky = (args: any): void => {
    args.cancel = true;
  };
  const eventClick = (args: any): void => {
    args.cancel = true;
    scheduleRef.deleteEvent(args.event.Id);
    args.cancel = true;
  };


  return (
    <ScheduleComponent
      showHeaderBar={false}
      ref={(schedule: ScheduleComponent) => {
        setScheduleObj(schedule);
        scheduleRef = schedule;
      }}
      showTimeIndicator={false}
      allowMultiCellSelection={false}
      allowMultiRowSelection={false}
      currentView="Week"
      onClick={onClicky}
      cellClick={onClicky}
      cellDoubleClick={onClicky}
      eventClick={eventClick}

      workHours={{ highlight: false, start: "8:00", end: "24:00" }}
      selectedDate={new Date(2022, 3, 9)}
      timeScale={{ enable: true, interval: 60, slotCount: 1 }}
      dateHeaderTemplate={dateHeaderTemplate}
    >
      <ViewsDirective>
        <ViewDirective
          option="Week"
          firstDayOfWeek={1}
          startHour="07:00"
          endHour="24:00"

        ></ViewDirective>
      </ViewsDirective>
      <Inject services={[Week, DragAndDrop, Resize]} />
    </ScheduleComponent>
  );
};

export default Scheduler;
