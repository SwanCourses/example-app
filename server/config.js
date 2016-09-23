const config = {
  mongoURL: process.env.MONGO_URL || 'mongodb://localhost:27017/barbarosh_course_app',
  port: process.env.PORT || 8000,
  UPLOADS_DIR: 'uploads'
};

export default config;
