import { Pipe, PipeTransform } from "@angular/core";
import * as Moment from "moment";

@Pipe({
  name: "timeTo",
})
export class TimeToPipe implements PipeTransform {
  transform(dueDate: string): any {
    const now = Moment().format();
    const dueDateX = Moment(dueDate);
    if (dueDate === "0000-00-00" || dueDate === undefined) {
      return dueDate;
    }
    // return Moment(dueDate).toNow(true);
    return dueDateX.from(now);
  }
}
