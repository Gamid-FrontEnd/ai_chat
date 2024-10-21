import { useState } from "react";
import { FormDivStyles } from "../../styles/CreateChatStyles";
import { useAppSelector } from "../../hook";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";

const CreateChat = () => {
  const [characterName, setCharacterName] = useState("");
  const [characterAppearance, setCharacterAppearance] = useState("");
  const [characterPersonality, setCharacterPersonality] = useState("");
  const [characterSituation, setCharacterSituation] = useState("");
  const [isNSFW, setIsNSFW] = useState(false);
  const [imageURL, setImageURL] = useState(
    '"https://upload.wikimedia.org/wikipedia/commons/6/63/Logo_La_Linea_100x100.png"'
  );

  const firestore = useAppSelector(
    (state) => state.firestoreSlice.firestoreInstance
  );
  const user = useAppSelector((state) => state.firestoreSlice.user);

  let allChats = useAppSelector((state) => state.chats.allChats);

  let idForCharacter = Number(allChats[allChats.length - 1].id) + 1;

  let onImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let img = e.target.files?.[0];
    if (img) {
      setImageURL(URL.createObjectURL(img));
    }
  };

  let handleCreateCharacter = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const chatRef = doc(
      firestore,
      "users",
      user.uid,
      "userCreatedChats",
      `${idForCharacter}`
    );
    const allChatsRef = doc(firestore, "all_chats", `${idForCharacter}`);
    await setDoc(chatRef, {
      id: idForCharacter.toString(),
      chatPhotoURL: imageURL,
      creatorId: user.uid,
      name: characterName,
      appearance: characterAppearance,
      personality: characterPersonality,
      situation: characterSituation,
      isNSFW: isNSFW,
    });

    await setDoc(allChatsRef, {
      id: idForCharacter.toString(),
      chatPhotoURL: imageURL,
      creatorId: user.uid,
      name: characterName,
      appearance: characterAppearance,
      personality: characterPersonality,
      situation: characterSituation,
      isNSFW: isNSFW,
    });
  };

  return (
    <FormDivStyles>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleCreateCharacter(e);
        }}
      >
        <label>Image</label>
        <input type="file" onChange={(e) => onImageChange(e)} />
        <label>Name the Character</label>
        <input
          id="name"
          type="text"
          onChange={(e) => setCharacterName(e.target.value)}
        />
        <label>Character appearance</label>
        <textarea
          id="appearance"
          onChange={(e) => setCharacterAppearance(e.target.value)}
        />
        <label>Character's personality</label>
        <textarea
          id="personality"
          onChange={(e) => setCharacterPersonality(e.target.value)}
        />
        <label>Describe the situation</label>
        <textarea
          id="situation"
          onChange={(e) => setCharacterSituation(e.target.value)}
        />
        <label>NSFW?</label>
        <input
          type="checkbox"
          id="isNSFW"
          onChange={() => setIsNSFW(!isNSFW)}
        />
        <label htmlFor="isNSFW">Yes</label>
        <input type="submit" />
      </form>
    </FormDivStyles>
  );
};

export default CreateChat;
