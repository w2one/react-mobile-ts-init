/**
 *  Storage
 */

function Storage(storage = sessionStorage) {
  /**
   * get
   */
  this.get = (key: string) => {
    const item = storage.getItem(key);
    try {
      return JSON.parse(item);
    } catch (error) {
      return item;
    }
  };

  /**
   * set
   */
  this.set = (key: string, value: any) => storage.setItem(key, JSON.stringify(value));

  /**
   * remove
   */
  this.remove = (key: string) => storage.removeItem(key);

  /**
   * clear
   */
  this.clear = () => storage.clear();
}

export const Session = new Storage();
export const Application = new Storage(localStorage);

export default { Session, Application };
