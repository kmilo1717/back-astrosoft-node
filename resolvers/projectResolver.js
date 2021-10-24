const User = require("../model/User");
const Proyect = require("../model/Proyect");

const resolvers = {
  Query: {
    getAllProyects: async () => {
      try {
        const resp = await Proyect.find({}).populate({
          path: "members.user_id",
          select: "fullname email role create_at state progress",
        });

        return resp;
      } catch (error) {
        console.log(error);
      }
    },
    getProyectById: async (_, { id }) => {
      const project = await Proyect.findById(id).populate({
        path: "members.user_id",
        select: "fullname email role create_at",
      });
      return project;
    },
  },
  Mutation: {
    newProyect: async (_, { input }) => {
      try {
        const newProyect = new Proyect(input);
        //save db
        const resp = await newProyect.save();
        return resp;
      } catch (error) {
        console.log(error);
      }
    },

    newMemberOnProject: async (_, { input }) => {
      try {
        const {
          id,
          members: { user_id, user_role },
        } = input;
        let proyExists = await Proyect.findById(id).populate({
          path: "members.user_id",
          select: "fullname email role create_at",
        });
        if (!proyExists) {
          throw new Error("Proyect does not exist");
        }

        let projMember = await User.findById(user_id);
        if (proyExists.members.find((item) => item._id == user_id)) {
          throw new Error("Member is on the project");
        }

        proyExists.members.push({
          _id: user_id,
          user_id: projMember,
          user_role: user_role,
        });
        await proyExists.save();
        console.log(proyExists);
        return proyExists;
      } catch (error) {
        console.log(error);
      }
    },

    deleteMemberOnProjectById: async (_, { input }) => {
      try {
        const { project_id, member_id } = input;
        let proyExists = await Proyect.findById(project_id).populate({
          path: "members.user_id members._id",
          select: "_id fullname email role create_at",
        });
        if (!proyExists) {
          throw new Error("Proyect does not exist");
        }
        let memberExists = await proyExists.members.filter((members) => members._id === member_id);
        if (!memberExists) {
          throw new Error("Member is not on the project");
        }
        console.log(memberExists);
        await proyExists.members.remove(member_id);
        await proyExists.save();
        console.log(proyExists);
        return proyExists;
      } catch (error) {
        console.log(error);
      }
    },
    deleteProjectById: async (_, { input }) => {
      try {
        const { project_id} = input;
        let proyExists = await Proyect.findById(project_id);
        if (!proyExists) {
          throw new Error("Proyect does not exist");
        }
        await proyExists.remove(project_id);
        await proyExists.save();
        console.log(proyExists);
        return proyExists;
      } catch (error) {
        console.log(error);
      }
    },

    progressProyect: async (_, { input }) => {
      console.log(input);
      const { id, progress } = input;
      let proyExists = await Proyect.findById( id );
      if (!proyExists) {
        throw new Error("Proyect does not exist");
      }
      if (progress <= 0) {
        proyExists.progress = 0;
        proyExists.state = "Sin Iniciar";
      } else if (progress > 1 && progress < 100) {
        proyExists.progress = progress;
        proyExists.state = "Iniciado";
      } else if (progress == 100) {
        proyExists.progress = progress;
        proyExists.state = "Finalizado";
      } else {
        throw new Error("Number no valid");
      }

      console.log(proyExists);

      await proyExists.save();
      return proyExists;
    },

    updateDatesProjectById: async (_, { input }) => {
      console.log(input);
      const { id, start_date, end_date } = input;
      let proyExists = await Proyect.findById( id );
      if (!proyExists) {
        throw new Error("Proyect does not exist");
      }
      proyExists.start_date = start_date;
      proyExists.end_date = end_date;

      console.log(proyExists);

      await proyExists.save();
      return proyExists;
    },
  },
};

module.exports = resolvers;
