import { observable, action, runInAction, flow } from "mobx";
import keys from "../../local/apikeys";

export class CatStore {
  @observable giphyCats: Array<any> = [];
  @observable state: "pending" | "done" | "error" = "pending";
  @observable offset: number = 0;

  catProcessor = (response: any): Array<any> => {
    console.log("cats", response);
    let finalData = response.data.map((item: any) => {
      return {
        title: item.title,
        url: item.images.fixed_height_small.url,
        id: item.id,
        type: item.type
      };
    });
    return finalData;
  };

  private checkStatus(response: Response): Promise<Response> {
    if (response.status >= 200 && response.status < 300) {
      return Promise.resolve(response);
    } else {
      let error = new Error(response.statusText);
      throw error;
    }
  }

  private parseJSON(response: Response): Promise<Response> {
    return response.json();
  }

  private createGiphyRequest(offset: number) {
    const options: RequestInit = {
      method: "GET",
      headers: { "Content-Type": "application/json" }
    };
    let params = {
      api_key: keys.giphy,
      q: "cat",
      limit: "" + 100,
      offset: "" + offset,
      rating: "pg"
    };
    let resultUrl =
      "http://api.giphy.com/v1/gifs/search" +
      "?" +
      new URLSearchParams(params).toString();
    return { url: resultUrl, options: { ...options } };
  }

  fetchGiphyCats = (offset: number) => {
    let { url, options } = this.createGiphyRequest(offset);
    let result = fetch(url, options)
      .then(res => this.checkStatus(res))
      .then(res => this.parseJSON(res));
    return result;
  };
  //

  @action
  fetchCats = async (offset: number) => {
    this.giphyCats = [];
    this.state = "pending";
    try {
      const cats = (await this.fetchGiphyCats(offset)) as any;
      const finalCats = this.catProcessor(cats);
      runInAction(() => {
        this.offset = cats.pagination.offset;
        this.giphyCats = finalCats;
        this.state = "done";
      });
    } catch (error) {
      console.log("error", error);
      runInAction(() => {
        this.state = "error";
      });
    }
  };
}
