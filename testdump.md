this is an example update endpoint
https://dev-t26qk6oz.us.auth0.com/api/v2/users/auth0

```js
export class ApiService {
  constructor(private http: HttpClient) {}
  payload: any;
  date: Date;
  strDate: string;
  strPayload: string;

  ping$(): Observable<any> {
    console.log('inside app.service.ts');
    console.log(config.apiUri);
    return this.http.get(`${config.apiUri}/api/orderPizza`);
  }

  updateMetadata$(): Observable<any> {
    this.date = new Date();
    this.strDate = this.date.toISOString().slice(0,19);
    //this.strPayload =  '{"user_metadata": {"Pizza Ordered:"'+':"'+this.strDate+'XXL"}}';
    this.strPayload =  '{"user_metadata": {"Pizza Ordered on '+this.strDate+'":'+'"XXL"}}';
    //this.strPayload =  '{"user_metadata": {"Pizza Ordered":"XXL"}}';
    this.payload = JSON.parse(this.strPayload);
    //this.payload = JSON.parse('{"user_metadata": {"Pizza Ordered":"XXL"}}');
    return this.http.patch(`https://dev-t26qk6oz.us.auth0.com/api/v2/users/auth0|603dcbce2a7542006aadcb07`, this.payload);
  }

}

```

```js
//Reads the user metadata and sets the global variable
function readUserMetaData() {
    var options1 = {
        method: "GET",
        url: `https://dev-lyqevnst.us.auth0.com/api/v2/users/${auth0UserId}`,
        headers: { authorization: mgtToken, "content-type": "application/json" },
    }

    axios
        .request(options1)
        .then(function (response1) {
            console.log("Read user response :", response1.data.user_metadata.orders.order)
            //if(response1.data.user_metadata.orders != undefined){
            userMetaData = response1.data.user_metadata.orders.order
            // }
        })
        .catch(function (error) {
            console.error("Read User Metadata:", error)
        })
}
```

```js
useEffect(() => {
    // POST request using fetch inside useEffect React hook
    const requestOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer my-token",
        },
        body: JSON.stringify({ title: "React Hooks POST Request Example" }),
    }
    fetch("https://reqres.in/api/posts", requestOptions)
        .then((response) => response.json())
        .then((data) => setPostId(data.id))

    // empty dependency array means this effect will only run once (like componentDidMount in classes)
}, [])
```
