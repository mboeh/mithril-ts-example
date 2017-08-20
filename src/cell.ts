export interface Getter<T> {
  (): T
}

export interface Setter<T> {
  (val: T): Cell<T>
}

interface UpdateFn<T> {
  (oldVal: T): T
}

export interface Updater<T> {
  (fn: UpdateFn<T>): Cell<T>
}

export interface Cell<T> {
  set: Setter<T>
  get: Getter<T>
  update: Updater<T>
}

export default function cell<T>(initialValue: T): Cell<T> {
  let value = initialValue
  const cell: any = {}
  cell.get = () => value
  cell.set = (v: T) => {
    value = v
    return cell
  }
  cell.update = (fn: UpdateFn<T>) => cell.set(fn(cell.get()))
  return cell
}
