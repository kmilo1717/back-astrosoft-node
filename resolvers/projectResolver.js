const User = require("../models/User");
const Proyect = require("../models/Proyect");

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

    progressProyect: async (_, { input }) => {
      console.log(input);
      const { id, progress } = input;
      let proyExists = await Proyect.findOne({ id });
      if (!proyExists) {
        throw new Error("Proyect does not exist");
      }
      if (progress <= 0) {
        proyExists.progress = 0;
        proyExists.state = "Not started";
      } else if (progress > 0 && progress <= 100) {
        proyExists.progress = progress;
        proyExists.state = "Start";
      } else if (progress > 100) {
        proyExists.progress = 100;
        proyExists.state = "Complete";
      }

      console.log(proyExists);

      proyExists.save();
      return proyExists;
    },
  },
};

module.exports = resolvers;
