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

  const prices = new Array(10).fill('29,90').map((price, index) => ({
    text: price,
    x: 50, // Defina a posição X inicial
    y: 500 + index * 50 // Define a posição Y, espaçando verticalmente
  }));

  return (
    <div className="app">
      <form className="form-upload">
        <label className="input-personalizado">
          <span className="botao-selecionar">Selecione uma imagem</span>
          <img
            className="imagem"
            src={imageSource}
            alt="Pré-visualização"
            style={{ display: imageSource ? 'block' : 'none' }}
          />
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
            onSave={(editedImageObject, designState) =>
              console.log('imagem salva', editedImageObject, designState)
            }
            onClose={closeImgEditor}
            annotationsCommon={{
              fill: '#ffffff' // Define a cor de preenchimento se necessário
            }}
            Text={{
              text: prices.map(price => price.text).join(' '), // Isso é apenas um exemplo
              fontSize: 32,
              fontStyle: 'bold',
              lineHeight: 1.48
            }}
            Rotate={{ angle: 0, componentType: 'slider' }}
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
