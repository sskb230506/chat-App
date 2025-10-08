import { useAuthStore } from "../store/authStore";

function ChatPage() {
  const { logout } = useAuthStore();
  return (
    <div className="z-10">
      ChatPage
      <button onClick={logout}>logout</button>
    </div>
  );
}
export default ChatPage;