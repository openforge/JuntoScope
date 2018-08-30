import { Pipe, PipeTransform } from "@angular/core";

@Pipe({ name: "objKeys" })
export class ObjectKeysPipe implements PipeTransform {
  transform(obj: Object): Array<string> {
    const transformed = [];

    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        transformed.push(key);
      }
    }

    return transformed;
  }
}

@Pipe({ name: "objValues" })
export class ObjectValuesPipe implements PipeTransform {
  transform(obj: Object): Array<any> {
    const transformed = [];

    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        transformed.push(obj[key]);
      }
    }

    return transformed;
  }
}

@Pipe({ name: "objKeyValue" })
export class ObjectKeyValuePipe implements PipeTransform {
  transform(obj: Object): Array<{ key: string; value: any }> {
    const transformed = [];

    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        transformed.push({ key, value: obj[key] });
      }
    }

    return transformed;
  }
}
