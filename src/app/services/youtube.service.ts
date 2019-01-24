import { Injectable } from '@angular/core';
//import { Http,URLSearchParams } from "@angular/http";
import { HttpClient,HttpParams} from '@angular/common/http'
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class YoutubeService {

   youtubeurl:string ="https://www.googleapis.com/youtube/v3";
   apikey:string = "AIzaSyBLXebhVQKxxvGW4ShKeRWCmHKL-ZX16bU";
   playlist :string ="UUuaPTYj15JSkETGnEseaFFg";
   
   nextPageToken : string ="CBkQAA";
  constructor(public http:HttpClient) { }

  getVideos(){
      let query = `/playlistItems`;
      let params  = new HttpParams();
      params = params.set('part','snippet');
      params = params.set('maxResults','10');
      params = params.set('playlistId',this.playlist);
      params = params.set('key',this.apikey);
      return  this.getQuery(query,params).pipe(map(data=>{
          this.nextPageToken = data['nextPageToken'];

          let videos:any[] = [];
          for(let video of data['items']){
              let snippet = video['snippet'];
              videos.push(snippet);
          }
         // console.log(videos);
          return videos;
      }));

  }
  getQuery(query:string,params:HttpParams){
      const url = `${this.youtubeurl}${query}`;
      return this.http.get(url,{params});
  }
}
