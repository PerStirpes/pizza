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
