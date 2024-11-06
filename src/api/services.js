const login = async (identifier, password) => {
  try {
    const res = await fetch("http://localhost:1337/api/auth/local", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ identifier, password }),
    });

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.error.message || "Login failed");
    }

    return await res.json();
  } catch (error) {
    console.error("API Error:", error);
    throw error;
  }
};
const register = async (username, email, password, avatar) => {
  try {
    const formData = new FormData();
    formData.append("username", username);
    formData.append("email", email);
    formData.append("password", password);
    if (avatar) {
      formData.append("avatar", avatar);
    }
    const res = await fetch("http://localhost:1337/api/auth/local/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        email,
        password,
      }),
    });

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.error.message || "Login failed");
    }

    return await res.json();
  } catch (error) {
    console.error("API Error:", error);
    throw error;
  }
};
const getProfile = async () => {
  try {
    const JWT_TOKEN = localStorage.getItem("jwt_token");
    if (!JWT_TOKEN) {
      return null;
    }
    const res = await fetch(
      "http://localhost:1337/api/users/me?populate[avatar]=*&populate[role]=*&populate[rooms]=*",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${JWT_TOKEN}`,
        },
      }
    );

    if (!res.ok) {
      return null;
    }

    return await res.json();
  } catch (error) {
    console.error("API Error:", error);
    throw error;
  }
};
const getUsers = async () => {
  try {
    const JWT_TOKEN = localStorage.getItem("jwt_token");
    if (!JWT_TOKEN) {
      return null;
    }
    const res = await fetch(
      "http://localhost:1337/api/users?populate[avatar]=*&populate[role]=*&populate[rooms]=*",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${JWT_TOKEN}`,
        },
      }
    );

    if (!res.ok) {
      return null;
    }

    return await res.json();
  } catch (error) {
    console.error("API Error:", error);
    throw error;
  }
};
const updateChatRoom = async (roomId, payload) => {
  try {
    const JWT_TOKEN = localStorage.getItem("jwt_token");
    if (!JWT_TOKEN) {
      return null;
    }
    const res = await fetch(
      `http://localhost:1337/api/chat-rooms/${roomId}/update-participants`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${JWT_TOKEN}`,
        },
        body: JSON.stringify(payload),
      }
    );

    if (!res.ok) {
      return null;
    }

    return await res.json();
  } catch (error) {
    console.error("API Error:", error);
    throw error;
  }
};
const getChatList = async () => {
  try {
    const JWT_TOKEN = localStorage.getItem("jwt_token");
    if (!JWT_TOKEN) {
      return null;
    }
    const res = await fetch("http://localhost:1337/api/chat-rooms?populate=*", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${JWT_TOKEN}`,
      },
    });

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.error.message || "Failed to fetch chat list");
    }

    return await res.json();
  } catch (error) {
    console.error("API Error:", error);
    throw error;
  }
};
const getChat = async (chat_room_id) => {
  try {
    const JWT_TOKEN = localStorage.getItem("jwt_token");

    const res = await fetch(
      `http://localhost:1337/api/chat-rooms/${chat_room_id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${JWT_TOKEN}`,
        },
      }
    );

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.error.message || "Failed to fetch chat list");
    }

    return await res.json();
  } catch (error) {
    console.log("API Error:", error);
  }
};
const createMessage = async (payload) => {
  try {
    const JWT_TOKEN = localStorage.getItem("jwt_token");

    const res = await fetch(`http://localhost:1337/api/messages`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${JWT_TOKEN}`,
      },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.error.message || "Failed to fetch chat list");
    }

    return await res.json();
  } catch (error) {
    console.log("API Error:", error);
  }
};

export const API = {
  login,
  getChatList,
  getChat,
  createMessage,
  getProfile,
  getUsers,
  updateChatRoom,
  register,
};
