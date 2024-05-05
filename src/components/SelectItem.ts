export class SelectItem {
  constructor (
    public key: string,
    public label: string,
    public action: () => void,
  ) {}
}