//export const BASE_URL = "http://localhost:3333";
//export const BASE_URL = "https://ozono-backend1.herokuapp.com";
export const BASE_URL = "https://ozono-backend-yvkpv.ondigitalocean.app";
export const endPoints = {
  //auth
  signup: `/auth/signup`,
  signin: `/auth/signin`,
  logout: `/auth/logout`,
  refresh_token: `/auth/refresh`,

  //user
  get_user: `/users/me`,
  get_profile_image: `/users/profileImage`,

  update_user: `/users/update`,
  upload_profile_image: `/users/profileImage/upload`,

  // Set Score
  set_score: `/score/set`,
  get_my_score: `/score/me`,

  //All users
  get_all_users: `/users/all`,
  get_users_by_role: `/users/all`,
  update_any_user: `/users/updateUser`,
  delete_any_user: `/users/deleteUser`,

  //courses
  create_course: `/courses/create`,

  get_course_image: `/courses/courseImage`,
  get_all_courses: `/courses/all`,
  get_courses_by_status: `/courses/status`,
  get_students: `/courses/users`,
  get_number_of_students: `/courses/users/count`,
  get_courses_me: `/courses/me`,

  get_teachers_by_course: `/courses/teachers`,

  get_students_by_course: `/courses/users`, //falta el id del curso

  update_course: `/courses/update`,

  delete_course: `/courses/delete`,

  add_teacher_to_course: `/courses/teacher/add`,
  delete_teacher_to_course: `/courses/teacher/remove`,
  set_feature_course: `/courses/featured`,

  //Categories
  create_category: `/categories/create`,

  get_all_categories: `/categories/all`,

  delete_category: `/categories/delete`,
  delete_categories: `/categories/delete-categories`,

  //Sections
  create_section: `/sections/create`,
  get_all_sections_by_course: `/sections`,
  get_section_by_lesson: `/sections/findByLesson`,
  update_section: `/sections/update`,
  delete_section: `/sections/delete`,
  get_section_by_index: `/sections/index`,

  //Lessons
  create_lesson: `/lessons/create`, //falta el ID de la SECCION a la que pertenece la clase
  get_lesson_by_id: `/lessons/me`,
  get_all_lessons_by_section: `/lessons`, //falta el ID de la SECCION a la que pertenece la clase
  update_lesson: `/lessons/update`,
  delete_lesson: `/lessons/delete`,
  get_first_lesson_by_courseId: `/lessons/getFirstLessonByCourseId`,

  //Videos
  get_all_videos: `/lessons/getAllVideos`,
  delete_video: `/lessons/deleteVideo`,

  //Resource
  get_all_resource: `/lessons/resource`,
  get_resource_by_id: `/lessons/resourceById`,

  //Lesson Content
  upload_video: `/lessons/upload/video`, //falta el ID de la CLASE
  get_video_by_lesson: `/lessons/video`, //falta el ID de la CLASE
  updoad_resource: `/lessons/upload/resource`,

  //Quizzes
  create_quiz: `/quiz/create`, //falta el id de la SECCION a la que pertenece el quiz
  get_all_quiz_by_section: `/quiz`, //falta el id de la SECCION a la que pertenece el quiz
  get_quiz_by_id: `/quiz/me`,
  update_quiz: `/quiz/update`, //falta el id del QUIZ
  delete_quiz: `/quiz/delete`, //falta el id del QUIZ

  //Questions
  create_question: `/questions/create`, //falta el id del QUIZ
  get_all_questions_by_quiz: `/questions/findAll`, //falta el id del QUIZ
  update_question: `/questions/update`, // falta el id de la PREGUNTA
  delete_question: `/questions/delete`, // falta el id de la PREGUNTA

  //Options
  get_all_options_by_question: `/options/find`, //falta el id de la PREGUNTA

  //paids
  create_payment: `/payments/create`,
  get_all_payments: `/payments/findAll`,
  get_all_payments_for_charts: `/payments/findAllForChart`,
  payment_approved: `/payments/approved`, //falta el id del PAGO
  payment_rejected: `/payments/rejected`, //falta el id del PAGO
  payment_set_account: `/payments/setAccount`,
  payment_get_account: `/payments/getAccount`,

  check_payment: `/payments/check`, //falta el id del PAGO

  get_all_payment_users: `/payments/getAllByUserId`,

  // mails
  mail_contact: `/mails/contact`,
  mail_role: `/mails/role`,
  mail_custom: `/mails/custom`,

  //comments
  get_all_comments: `/comments/findAll`,
  get_by_courseId: `/comments/getByCourseId`,
  get_by_userId: `/comments/getByUserId`,
  create_comment: `/comments/create`,
  update_comment: `/comments/update`,
  delete_comment: `/comments/delete`,

  //Coupons
  create_coupon: `/coupons/create`,
  get_all_coupons: `/coupons/findAll`,
  get_coupon_by_couponId_and_course: `/coupons/getByIdAndCourse`,
  update_coupon: `/coupons/updateById`,
  delete_coupon: `/coupons/deleteById`,
  verify_coupon: `/coupons/verify`,

  //certificates
  get_certificate: `/certificate`,
};
