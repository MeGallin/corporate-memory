import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'memorySearch',
  pure: false
})
export class MemorySearchPipe implements PipeTransform {
  transform(memories: any[], searchTerm: string): any {
    if (!memories || searchTerm === undefined) {
      return memories;
    }

    return memories.filter(
      memory =>
        memory.title.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1 ||
        memory.memory.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1 ||
        memory.tagNames.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1
    );
  }
}
