import './estilo.css'
import {useState, useEffect} from 'react'
import { addDoc, doc, collection, getDocs, updateDoc, deleteDoc, onSnapshot} from 'firebase/firestore'
import { db , auth } from './firebaseConect'
import { createUserWithEmailAndPassword, 
  signInWithEmailAndPassword,
 signOut,
onAuthStateChanged } from 'firebase/auth'
 

export default function Main(){


    const [nome,setNome] = useState('');
    const [profissao, setProfissao] = useState('');

    const [posts,setPost] = useState([])
    const [idPost, setIdPost] = useState('');
    
    const [email, setEmail] = useState ('')
    const [senha, setSenha] = useState ('')

    const [user, setUser] = useState(false)
    const [detail, setDetail] = useState({})


    // useEffect(() => {
    //   async function loadPost(){
    //   const att = onSnapshot(collection(db,"dados"),(snapshot) => {
    //     let listaDoc = [];

    //     snapshot.forEach((doc) => {
    //       listaDoc.push({
    //         id: doc.id,
    //         nome: doc.data().nome,
    //         profissao: doc.data().profissao
    //       }) 
    //     })
    //       setPost(listaDoc)

    //   } )


    //   }

    //   loadPost();

    //  }, [])



    useEffect(() => {
      async function checkLogin() {
        onAuthStateChanged(auth, (user) => {
          if(user){
            console.log(user)
            setUser(true)
            setDetail({
              uid: user.uid,
              email: user.email
            })
          }
          else {
            setUser(false)
            setDetail({})
          }
        })
      }

      checkLogin()

    }, [])

    async function Cadastro(){


      await addDoc(collection(db, "dados"), {
        nome: nome,
        profissao: profissao
      })
      .then(() => {
  
        console.log("Sucesso")
        setNome("")
        setProfissao("")
      })
      .catch(() => {
        console.log("Erro")
      })

      }


    async function Editar(){
      
      const postRef = doc(db, "dados", idPost)
      await updateDoc(postRef, {
        nome: nome,
        profissao: profissao
      })
      .then(() => {
        setIdPost('')
        setNome('')
        setProfissao('')
      })
      .catch(() => {
        console.log("ERRO")
      })

      
      }  

  
      
    async function limpar(){

      const postRef = collection(db, "dados") 

      await getDocs(postRef)
      .then((snapshot) => {
        setPost([])
      })
   

    }
      
      async function Buscar(){

      const postRef = collection(db, "dados") //criar referencia para doc

      await getDocs(postRef)
      .then((snapshot) => {
        let lista = [];

        snapshot.forEach((doc) => {
          lista.push({
            id: doc.id,
            nome: doc.data().nome,
            profissao: doc.data().profissao,
          })

        })

        setPost(lista)
        
      })
      .catch(() => {
        alert("Error")
      })

     

    }

    async function apagarPost(id){
        
      const postRef = doc(db,"dados", id)

      await deleteDoc(postRef)
      .then(() => {
        alert(id + " Excluido com sucesso")
      })
      .catch(() => {
        alert("ERRO")
      })
    }


    async function novoUsuario(){
      await createUserWithEmailAndPassword(auth, email, senha)
      .then(() => {
        alert('Cadastrado com sucesso!')
        setEmail('')
        setSenha('')
      })
      .catch((error) => {
        if(error.code === 'auth/weak-password'){
          alert("Senha muito fraca!")
        } else if (error.code === 'auth/email-already-in-use'){
          alert("Email já cadastrado!")
        }


      })
    }


    async function loginUsuario(){
      await signInWithEmailAndPassword(auth,email,senha)
      .then((value) => { // adicionar value na promise para resgatar os valores do usuario
        alert("Login Feito com sucesso!")
        setEmail('')
        setSenha('')

        setDetail({
          uid: value.user.uid,
          email: value.user.email
        })

        setUser(true)


      })
      .catch(() => {
        alert("Falha ao logar")
      })
    }

    async function Sair(){
      await signOut(auth)
      setUser(false)
      setDetail({})
    }

    return(

      

        <div className='box'>

    
        <h1>Cadastro com firebase</h1>


        {user && (
          <div>
            <strong>Seja bem vinde: {detail.email}</strong>
            <button onClick={Sair}>Deslogar</button>
          </div>
        )}

        <div className='cadastro'> 
        <label>Email</label>
        <input value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder='Digite seu email'></input>
        <br></br>

        <label>Senha</label>
        <input value={senha}
        onChange={(e) => setSenha(e.target.value)}
        placeholder='Digite sua senha'></input> 
        <br></br>

          <div className='btn-cadastro'>
        <button onClick={novoUsuario}>Novo Usuario</button>
        <button onClick={loginUsuario}>Login</button>
          </div>
        <hr></hr>-
        <br></br>
        
        </div>




        <label>Atualizar ID</label>
        <input placeholder='Informe o ID'
        value={idPost}
        onChange={(e) => setIdPost(e.target.value)} //receber o evento cada vez que mudar


        ></input>

        <div className='container'>
        <label>Nome</label>
        <input type="text"
        placeholder="Insira seu nome"
        value={nome}
        onChange={(e) => setNome(e.target.value)}></input>

    
        <label>Profissao</label>
        <input type="text"
        placeholder="insira sua profissao"
        value={profissao}
        onChange={(e) => setProfissao(e.target.value)}></input>

        <div className='area-btn'>
        <button
        onClick={Cadastro} className='btn'>Cadastrar</button>
        <button onClick={Buscar}>Buscas Dados</button>
        <button onClick={limpar}>Limpar</button>
        <button onClick={Editar}>Editar</button>
        </div>
        <ul>
        {posts && posts.map( post => {
             return(
              <li key={post.id}>
                <span>ID: {post.id}</span>    
                <span>Nome: {post.nome}</span>
                <span>Profissão: {post.profissao}</span>
                <button onClick={() => apagarPost(post.id)}>Excluir</button>
              </li>
             )
           } )}
        
        </ul>


        </div>
        


        </div>
    )
}