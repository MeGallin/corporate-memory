import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "filterDueDate",
})
export class FilterDueDatePipe implements PipeTransform {
  transform(memories: any[], filterByDueDate: string): any {
    if (!memories) {
      return memories;
    }
    return memories.filter(
      (memory) => memory.dueDate.indexOf(filterByDueDate) !== -1
    );
  }
}
