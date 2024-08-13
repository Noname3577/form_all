let data = [
  {
    id: 1,
    username: "testuser",
    password: "123456",
  },
];

export const getData = () => {
  return data;
};

export const login = (username, password) => {
  const user = data.find(
    (u) => u.username === username && u.password === password
  );
  return user ? true : false;
};

export const register = (username, password) => {
  if (data.some((u) => u.username === username)) {
    return { success: false, message: "ชื่อผู้ใช้มีอยู่แล้ว" };
  }

  const passwordRegex =
    /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.{8,})/;
  if (!passwordRegex.test(password)) {
    return {
      success: false,
      message:
        "รหัสผ่านไม่ตรงตามข้อกำหนด 1. มีตัวพิมใหญ่-พิมเล็ก 2.มีเกิน 8 ตัว 3.มี !@#$%^&* ",
    };
  }

  const newUser = {
    id: data.length + 1,
    username,
    password,
  };
  data.push(newUser);
  return { success: true, message: "สมัครสมาชิก เรียบร้อย" };
};
