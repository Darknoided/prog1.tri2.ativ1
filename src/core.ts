class Item {
    constructor(public title: string){}
}

class TodoList {
    private items: Item[] = [];
    private filePath: string;

    constructor(filePath: string){
        this.filePath = filePath;
        this.readListFromDisk();
    }

    private async saveListToDisk(){
        const file = Bun.file(this.filePath);
        const data = JSON.stringify(this.items);
        await file.write(data);
    }

    private async readListFromDisk(){
        const file = Bun.file(this.filePath);
        // const text = await file.text();
        // const data = JSON.parse(text);
        const data = await file.json();
        this.items = data.map((v: any) => {
            return new Item(v.title);
        })
    }

    /**
     * Adiciona um item a lista
     */
    async addItem(item: Item){
        if (!item)
            throw 'item não pode ser nulo ou indefinido'
        if (!item.title || !item.title.trim())
            throw 'item.title não pode ser nulo ou indefinido'
        this.items.push(item);
        await this.saveListToDisk();
    }

    /**
     * Remove um item da lista
     */
    async removeItem(index: number) {
        this.items.splice(index, 1);
        await this.saveListToDisk();
    }

    getItems(): Item[] {
        return [...this.items];
    }

}

export default TodoList
export { Item, TodoList }