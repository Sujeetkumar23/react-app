import About from "./About";
import "./App.css";
import Footer from "./Footer";
import Header from "./Header";
import Home from "./Home";
import Missing from "./Missing";
import Nav from "./Nav";
import Newpost from "./Newpost";
import Postpage from "./Postpage";
import Post from "./Post";
import { useEffect, useState } from "react";
import { format } from "date-fns";
import { Route, Routes, useNavigate } from "react-router-dom";
import api from "./api/posts"
import useWindowSize from "./hooks/useWindowSize";


function App() {
  const [posts, setposts] = useState([
  
  ]);

  const [search, setsearch] = useState("");
  const [searchresult, setsearchresult] = useState([]);
  const [postTitle, setpostTitle] = useState("");
  const [postbody, setpostbody] = useState("");
  const {width} =useWindowSize()

  const navigator =useNavigate()
    useEffect(() => {

    const fetchPosts = async () => {
      try {
        const response = await api.get('/posts');
        setposts(response.data);
      } catch (err) {
        if (err.response) {
          console.log(err.response.data); // Response data from the server
          console.log(err.response.status); // HTTP status code
          console.log(err.response.headers); // HTTP response headers
        } else {
          console.log(`Error: ${err.message}`); // Network error or other client-side error
        }
      }
    };
  
    fetchPosts();
  }, []);

  
 useEffect(()=>{
  const filterResults = posts.filter((post) => {
    const lowerCaseTitle = post.title.toLowerCase();
    const lowerCaseBody = post.body.toLowerCase();
    const lowerCaseSearch = search.toLowerCase();

    return (
      lowerCaseTitle.includes(lowerCaseSearch) || 
      lowerCaseBody.includes(lowerCaseSearch)
    );
  });

  // Reverse the filtered results and update the state
  setsearchresult(filterResults.reverse());


 },[posts,search])

  const handlesubmit = async (event) => {
    event.preventDefault()
    const id = posts.length ? posts[posts.length - 1].id + 1 : 1;
    const datetime = format(new Date(), "MMMM dd, yyyy pp");
    const newPost = { id, title: postTitle, datetime, body: postbody };
    try{
    const response = await api.post('/posts',newPost)
    const allpost = [...posts,response.data];
    setposts(allpost);

    setpostTitle("");
    setpostbody("");
    navigator('/')
    }catch (err) {
      if (err.response) {
        console.log(err.response.data); // Response data from the server
        console.log(err.response.status); // HTTP status code
        console.log(err.response.headers); // HTTP response headers
      } else {
        console.log(`Error: ${err.message}`); // Network error or other client-side error
      }
    }
    
    };
 
   const handleDelete = async (id)=>{
    try{
    await api.delete(`/posts/${id}`)  
    const postList =posts.filter(post => post.id !== id);
    setposts(postList)
    navigator('/')
    }catch (err) {
      if (err.response) {
        console.log(err.response.data); // Response data from the server
        console.log(err.response.status); // HTTP status code
        console.log(err.response.headers); // HTTP response headers
      } else {
        console.log(`Error: ${err.message}`); // Network error or other client-side error
      }
    }

   } 

  return (
    <div className="App">
      <Header title={"sujeet social media"} width={width} />
      <Nav search={search} setsearch={setsearch} />
      <Routes>   
      < Route path="/" element={<Home posts={searchresult}/>}/>

       <Route path="post">
        <Route index element={< Newpost 
         postTitle={postTitle}
         setpostTitle={setpostTitle}
         postbody={postbody}
         setpostbody={setpostbody}
         handlesubmit={handlesubmit}
      /> } />
    
       <Route path=":id" element={<Postpage  posts={posts} handleDelete={handleDelete}/>}/>
       </Route> 
      <Route path="about" element={ <About />} />
      <Route path="*" element = {<Missing />}/>

      </Routes>
    
      <Footer />
      
    </div>
  );
}

export default App;
