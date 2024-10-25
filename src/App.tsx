import { useState } from 'react';
import FilerobotImageEditor, {
  TABS,
  TOOLS
} from 'react-filerobot-image-editor';

function App() {
  const [isImgEditorShown, setIsImgEditorShown] = useState(false);
  const [imageSource, setImageSource] = useState<string>(''); // Define o tipo como string

  const openImgEditor = () => {
    if (imageSource) {
      setIsImgEditorShown(true);
    } else {
      alert('Por favor, adicione uma imagem antes de abrir o editor.');
    }
  };

  const closeImgEditor = () => {
    setIsImgEditorShown(false);
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageSource(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="app">
      <form className="form-upload">
        <label className="input-personalizado">
          <span className="botao-selecionar">Selecione uma imagem</span>
          <img className="imagem" />
          <input
            className="input-file"
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
          />
        </label>
      </form>

      <button onClick={openImgEditor}>Abrir editor de imagem</button>

      {isImgEditorShown && imageSource && (
        <div style={{ width: '99vw', height: '95vh' }}>
          <FilerobotImageEditor
            source={imageSource}
            // Também dá pra adicionar a url direto em source=""
            onSave={(editedImageObject, designState) =>
              console.log('imagem salva', editedImageObject, designState)
            }
            onClose={closeImgEditor}
            annotationsCommon={{
              fill: '#ff0000'
            }}
            Text={{ text: 'Filerobot...' }}
            Rotate={{ angle: 90, componentType: 'slider' }}
            tabsIds={[TABS.ADJUST, TABS.ANNOTATE, TABS.WATERMARK]}
            defaultTabId={TABS.ANNOTATE}
            defaultToolId={TOOLS.TEXT}
            savingPixelRatio={1}
            previewPixelRatio={1}
          />
        </div>
      )}
    </div>
  );
}

export default App;
