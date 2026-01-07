import VillageScene from "@/scenes/VillageScene";
import HomeScene from "@/scenes/HomeScene";
import WorkshopScene from "@/scenes/WorkshopScene";
import ForestScene from "@/scenes/ForestScene";
import PostOfficeScene from "@/scenes/PostOfficeScene";
import { SCENES } from "@/constants/scenes";

export default function SceneManager({ currentScene, onChangeScene }) {
  const goTo = (sceneKey) => {
    onChangeScene(sceneKey);
    console.log(sceneKey);
  };

  switch (currentScene) {
    case SCENES.HOME:
      return <HomeScene onNavigate={goTo} />;
    case SCENES.WORKSHOP:
      return <WorkshopScene onNavigate={goTo} />;
    case SCENES.FOREST:
      return <ForestScene onNavigate={goTo} />;
    case SCENES.POST_OFFICE:
      return <PostOfficeScene onNavigate={goTo} />;
    case SCENES.VILLAGE:
    default:
      return (
        <VillageScene
          onEnterBuilding={(key) => onChangeScene(key)}
          onChangeScene={onChangeScene}
        />
      );
  }
}
