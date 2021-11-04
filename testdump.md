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
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            Authorization:
                "Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6Ik1rVTNSVEU0TmtRelFUTTVRVGd4TUVVNFJFUXhORE16TURoRE9EWXhNVEpGTUVaR01UWTNNQSJ9.eyJpc3MiOiJodHRwczovL2Rldi05ejljamY3MC5hdXRoMC5jb20vIiwic3ViIjoiQ1BpRVRTSzBvZkk1bFRVcjZMR2VhRmsyekdlOHI3S0ZAY2xpZW50cyIsImF1ZCI6Imh0dHBzOi8vZGV2LTl6OWNqZjcwLmF1dGgwLmNvbS9hcGkvdjIvIiwiaWF0IjoxNjM1OTYwODM5LCJleHAiOjE2MzYwNDcyMzksImF6cCI6IkNQaUVUU0swb2ZJNWxUVXI2TEdlYUZrMnpHZThyN0tGIiwic2NvcGUiOiJyZWFkOmNsaWVudF9ncmFudHMgY3JlYXRlOmNsaWVudF9ncmFudHMgZGVsZXRlOmNsaWVudF9ncmFudHMgdXBkYXRlOmNsaWVudF9ncmFudHMgcmVhZDp1c2VycyB1cGRhdGU6dXNlcnMgZGVsZXRlOnVzZXJzIGNyZWF0ZTp1c2VycyByZWFkOnVzZXJzX2FwcF9tZXRhZGF0YSB1cGRhdGU6dXNlcnNfYXBwX21ldGFkYXRhIGRlbGV0ZTp1c2Vyc19hcHBfbWV0YWRhdGEgY3JlYXRlOnVzZXJzX2FwcF9tZXRhZGF0YSByZWFkOnVzZXJfY3VzdG9tX2Jsb2NrcyBjcmVhdGU6dXNlcl9jdXN0b21fYmxvY2tzIGRlbGV0ZTp1c2VyX2N1c3RvbV9ibG9ja3MgY3JlYXRlOnVzZXJfdGlja2V0cyByZWFkOmNsaWVudHMgdXBkYXRlOmNsaWVudHMgZGVsZXRlOmNsaWVudHMgY3JlYXRlOmNsaWVudHMgcmVhZDpjbGllbnRfa2V5cyB1cGRhdGU6Y2xpZW50X2tleXMgZGVsZXRlOmNsaWVudF9rZXlzIGNyZWF0ZTpjbGllbnRfa2V5cyByZWFkOmNvbm5lY3Rpb25zIHVwZGF0ZTpjb25uZWN0aW9ucyBkZWxldGU6Y29ubmVjdGlvbnMgY3JlYXRlOmNvbm5lY3Rpb25zIHJlYWQ6cmVzb3VyY2Vfc2VydmVycyB1cGRhdGU6cmVzb3VyY2Vfc2VydmVycyBkZWxldGU6cmVzb3VyY2Vfc2VydmVycyBjcmVhdGU6cmVzb3VyY2Vfc2VydmVycyByZWFkOmRldmljZV9jcmVkZW50aWFscyB1cGRhdGU6ZGV2aWNlX2NyZWRlbnRpYWxzIGRlbGV0ZTpkZXZpY2VfY3JlZGVudGlhbHMgY3JlYXRlOmRldmljZV9jcmVkZW50aWFscyByZWFkOnJ1bGVzIHVwZGF0ZTpydWxlcyBkZWxldGU6cnVsZXMgY3JlYXRlOnJ1bGVzIHJlYWQ6cnVsZXNfY29uZmlncyB1cGRhdGU6cnVsZXNfY29uZmlncyBkZWxldGU6cnVsZXNfY29uZmlncyByZWFkOmhvb2tzIHVwZGF0ZTpob29rcyBkZWxldGU6aG9va3MgY3JlYXRlOmhvb2tzIHJlYWQ6YWN0aW9ucyB1cGRhdGU6YWN0aW9ucyBkZWxldGU6YWN0aW9ucyBjcmVhdGU6YWN0aW9ucyByZWFkOmVtYWlsX3Byb3ZpZGVyIHVwZGF0ZTplbWFpbF9wcm92aWRlciBkZWxldGU6ZW1haWxfcHJvdmlkZXIgY3JlYXRlOmVtYWlsX3Byb3ZpZGVyIGJsYWNrbGlzdDp0b2tlbnMgcmVhZDpzdGF0cyByZWFkOmluc2lnaHRzIHJlYWQ6dGVuYW50X3NldHRpbmdzIHVwZGF0ZTp0ZW5hbnRfc2V0dGluZ3MgcmVhZDpsb2dzIHJlYWQ6bG9nc191c2VycyByZWFkOnNoaWVsZHMgY3JlYXRlOnNoaWVsZHMgdXBkYXRlOnNoaWVsZHMgZGVsZXRlOnNoaWVsZHMgcmVhZDphbm9tYWx5X2Jsb2NrcyBkZWxldGU6YW5vbWFseV9ibG9ja3MgdXBkYXRlOnRyaWdnZXJzIHJlYWQ6dHJpZ2dlcnMgcmVhZDpncmFudHMgZGVsZXRlOmdyYW50cyByZWFkOmd1YXJkaWFuX2ZhY3RvcnMgdXBkYXRlOmd1YXJkaWFuX2ZhY3RvcnMgcmVhZDpndWFyZGlhbl9lbnJvbGxtZW50cyBkZWxldGU6Z3VhcmRpYW5fZW5yb2xsbWVudHMgY3JlYXRlOmd1YXJkaWFuX2Vucm9sbG1lbnRfdGlja2V0cyByZWFkOnVzZXJfaWRwX3Rva2VucyBjcmVhdGU6cGFzc3dvcmRzX2NoZWNraW5nX2pvYiBkZWxldGU6cGFzc3dvcmRzX2NoZWNraW5nX2pvYiByZWFkOmN1c3RvbV9kb21haW5zIGRlbGV0ZTpjdXN0b21fZG9tYWlucyBjcmVhdGU6Y3VzdG9tX2RvbWFpbnMgdXBkYXRlOmN1c3RvbV9kb21haW5zIHJlYWQ6ZW1haWxfdGVtcGxhdGVzIGNyZWF0ZTplbWFpbF90ZW1wbGF0ZXMgdXBkYXRlOmVtYWlsX3RlbXBsYXRlcyByZWFkOm1mYV9wb2xpY2llcyB1cGRhdGU6bWZhX3BvbGljaWVzIHJlYWQ6cm9sZXMgY3JlYXRlOnJvbGVzIGRlbGV0ZTpyb2xlcyB1cGRhdGU6cm9sZXMgcmVhZDpwcm9tcHRzIHVwZGF0ZTpwcm9tcHRzIHJlYWQ6YnJhbmRpbmcgdXBkYXRlOmJyYW5kaW5nIGRlbGV0ZTpicmFuZGluZyByZWFkOmxvZ19zdHJlYW1zIGNyZWF0ZTpsb2dfc3RyZWFtcyBkZWxldGU6bG9nX3N0cmVhbXMgdXBkYXRlOmxvZ19zdHJlYW1zIGNyZWF0ZTpzaWduaW5nX2tleXMgcmVhZDpzaWduaW5nX2tleXMgdXBkYXRlOnNpZ25pbmdfa2V5cyByZWFkOmxpbWl0cyB1cGRhdGU6bGltaXRzIGNyZWF0ZTpyb2xlX21lbWJlcnMgcmVhZDpyb2xlX21lbWJlcnMgZGVsZXRlOnJvbGVfbWVtYmVycyByZWFkOmVudGl0bGVtZW50cyByZWFkOmF0dGFja19wcm90ZWN0aW9uIHVwZGF0ZTphdHRhY2tfcHJvdGVjdGlvbiByZWFkOm9yZ2FuaXphdGlvbnMgdXBkYXRlOm9yZ2FuaXphdGlvbnMgY3JlYXRlOm9yZ2FuaXphdGlvbnMgZGVsZXRlOm9yZ2FuaXphdGlvbnMgY3JlYXRlOm9yZ2FuaXphdGlvbl9tZW1iZXJzIHJlYWQ6b3JnYW5pemF0aW9uX21lbWJlcnMgZGVsZXRlOm9yZ2FuaXphdGlvbl9tZW1iZXJzIGNyZWF0ZTpvcmdhbml6YXRpb25fY29ubmVjdGlvbnMgcmVhZDpvcmdhbml6YXRpb25fY29ubmVjdGlvbnMgdXBkYXRlOm9yZ2FuaXphdGlvbl9jb25uZWN0aW9ucyBkZWxldGU6b3JnYW5pemF0aW9uX2Nvbm5lY3Rpb25zIGNyZWF0ZTpvcmdhbml6YXRpb25fbWVtYmVyX3JvbGVzIHJlYWQ6b3JnYW5pemF0aW9uX21lbWJlcl9yb2xlcyBkZWxldGU6b3JnYW5pemF0aW9uX21lbWJlcl9yb2xlcyBjcmVhdGU6b3JnYW5pemF0aW9uX2ludml0YXRpb25zIHJlYWQ6b3JnYW5pemF0aW9uX2ludml0YXRpb25zIGRlbGV0ZTpvcmdhbml6YXRpb25faW52aXRhdGlvbnMiLCJndHkiOiJjbGllbnQtY3JlZGVudGlhbHMifQ.dfVZsJ33BU3zVShLORnR-hv5QkBXbcS-hfYTouB1Ke45DDU4GDyee0QzOsO6na0RZvOjCJxue1s7F6SJZRpKUpIx4-L3mr6qk8EQf7pT7aFMuPgdHDLJ0425sJUPABAi7KIxauWCWBDjMKUw93TiTT8a9MgWINpsWsXA6rt39CSqQGTvFYUd_2uSWpPSJ__TGMFy8hcNi4z2Zf1-I0z34T8clPTnwjK0nS3XGTAiGYapm5uERtSHLSLZQ8RM00hZ6pprm6ZAHlM_1iatDDs-Vqx6VLJZUdmdr8Ce66BfxwZH4Tl9waTOU_kNZR-ai3FP6TZUyet8edP6h3BhdH0Ikw",
        },
        body: JSON.stringify({ user_metadata: { orders: [{ pizza: "CCheesse" }] } }),
    }
    fetch("https://dev-9z9cjf70.auth0.com/api/v2/users/google-oauth2%7C111218919835381162922", requestOptions)
        .then((response) => response.json())
        .then((data) => console.log(data))

    // empty dependency array means this effect will only run once (like componentDidMount in classes)
}, [])
```

-X PATCH -H "Content-Type: application/json" -d '{"user_metadata":{"orders":[{"pizza":"cheesse"}]}}' https://dev-9z9cjf70.auth0.com/api/v2/users/google-oauth2%7C111218919835381162922

```
create:users
"read:users update:users read:users_app_metadata update:users_app_metadata create:users_app_metadata",
```
