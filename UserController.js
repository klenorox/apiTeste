import User from "../models/User.js";

const UserController = {
    getAllUsers: async (req, res) => {
        try {
          const users = await User.find({});
          return res.status(200).json({ usuarios: users });
        } catch (error) {
          console.error('Erro ao buscar todos os usuários:', error);
          return res.status(500).json({ mensagem: 'Erro interno do servidor' });
        }
      },

      createUser: async (req, res) => {
        try {
          const { name, email } = req.body;
      
          if (!name) {
            return res.status(400).json({ mensagem: 'O campo nome deve ser preenchidos' });
          } if(!email){
            return res.status(400).json({ mensagem: 'O campo email deve ser preenchidos' });
          }
      
          const user = { name, email };
          const newUser = await User.create(user);
      
          return res.status(201).json({ usuarioCriado: newUser });
        } catch (error) {
          console.error('Erro ao criar o usuário:', error);
          return res.status(500).json({ mensagem: 'Erro interno do servidor' });
        }
      }
      ,

    deletarUserById : async (req, res) => {
        try {
          const { id } = req.params;
          const userForDelete = await User.findByIdAndRemove(id);
       
          if (!userForDelete) {
            return res.status(404).json({ mensagem: 'Usuário não encontrado' });
          }
      
          return res.status(200).json({ usuarioDeletado: userForDelete });
        } catch (error) {
          console.error('Erro ao excluir o usuário:', error);
          return res.status(500).json({ mensagem: 'Erro interno do servidor' });
        }
      },

      findUserById : async (req,res)=>{
        try{
            const { id } = req.params;
            const user = await User.findById(id);
            return res.status(200).json({ usuarioEncontrado: user });
        }catch(error){
            return res.status(404).json({ mensagem: 'Usuário não encontrado' });
        }
      }

}

export default UserController