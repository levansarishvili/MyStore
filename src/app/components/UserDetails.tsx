import GetUserData from "./GetUserData";
import { Button } from "./ui/button";

export default async function UserDetails() {
  const userData = await GetUserData();

  if (!userData) {
    console.error("User data not found");
    return null;
  }

  return (
    <form className="flex flex-col justify-center items-center gap-6 w-full bg-muted p-6 rounded-xl">
      {[
        { label: "Full Name", id: "full_name", type: "text" },
        { label: "Username", id: "user_name", type: "text" },
        { label: "Phone", id: "phone", type: "tel" },
        { label: "Email", id: "email", type: "email" },
      ].map(({ label, id, type }) => (
        <div key={id} className="flex flex-col w-full">
          <label
            className="text-sm font-medium text-muted-foreground mb-1"
            htmlFor={id}
          >
            {label} <span className="text-destructive">*</span>
          </label>
          <input
            className="w-full rounded-lg px-4 py-2 text-sm bg-background border border-muted focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all duration-300"
            type={type}
            id={id}
            defaultValue={userData?.user_metadata[id] ?? ""}
          />
        </div>
      ))}

      <Button
        variant="default"
        className="mt-4 bg-primary text-white text-sm font-medium py-2 px-6 rounded-lg transition-all duration-300 hover:bg-[#2ca76e]"
      >
        Save Changes
      </Button>
    </form>
  );
}
