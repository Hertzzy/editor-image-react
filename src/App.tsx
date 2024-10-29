import { useState } from 'react';
import FilerobotImageEditor, {
  TABS,
  TOOLS
} from 'react-filerobot-image-editor';
import defaultImage from './assets/imgs/menu-tv-airton-base.png';

function App() {
  const [isImgEditorShown, setIsImgEditorShown] = useState(false);
  const [imageSource] = useState<string>(defaultImage); // Define imagem padrão

  const openImgEditor = () => {
    setIsImgEditorShown(true);
  };

  const closeImgEditor = () => {
    setIsImgEditorShown(false);
  };

  // Lista de preços específica
  const priceValues = [
    '29,99',
    '22,99',
    '29,99',
    '34,99',
    '17,99',
    '29,99',
    '16,99',
    '29,99',
    '17,99',
    '29,99'
  ];

  // Mapeia os preços para um formato de anotação
  const prices = priceValues.map((price, index) => ({
    text: price,
    x: 50,
    y: 500 + index * 50,
    fontSize: 26, // Define tamanho padrão da fonte
    fontStyle: 'bold', // Define a font como bold
    lineHeight: 1.41 // Define altura entre cada texto
  }));

  return (
    <div className="app">
      <button onClick={openImgEditor}>Abrir editor de imagem</button>

      {isImgEditorShown && (
        <div style={{ width: '99vw', height: '79vh' }}>
          <FilerobotImageEditor
            source={imageSource}
            onSave={(editedImageObject, designState) =>
              console.log('imagem salva', editedImageObject, designState)
            }
            onClose={closeImgEditor}
            annotationsCommon={{
              fill: '#ffffff' // Define a cor padrão do texto
            }}
            Text={{
              text: prices.map(price => price.text).join(' '), // Lista de preços inicial
              fontSize: 26,
              fontStyle: 'bold',
              lineHeight: 1.41
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
