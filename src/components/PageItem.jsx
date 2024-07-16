import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../style/mob.css';

const WikiPage = () => {
  const [content, setContent] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const response = await axios.get('https://pt.minecraft.wiki/api.php', {
          params: {
            action: 'query',
            format: 'json',
            titles: 'Emerald',
            prop: 'revisions',
            rvslots: 'main',
            rvprop: 'content|contentformat',
            formatversion: 2
          }
        });
        const page = response.data.query.pages[0];
        const content = page.revisions[0].slots.main.content;
        setContent(content);
      } catch (error) {
        console.error('Error fetching content:', error);
        setError('Ocorreu um erro ao buscar o conteúdo da página.');
      }
    };

    fetchContent();
  }, []);


  const parseWikiContent = (content) => {
    // Exemplo simples de parser, pode ser expandido para lidar com mais casos
    return content
      .replace(/==\s*(.*?)\s*==/g, '<h2>$1</h2>')  // Seções
      .replace(/===\s*(.*?)\s*===/g, '<h3>$1</h3>')  // Sub-seções
      .replace(/====\s*(.*?)\s*====/g, '<h4>$1</h4>')  // Sub-sub-seções
      .replace(/\[\[([^\|\]]+)\|([^\]]+)\]\]/g, '<a href="/wiki/$1">$2</a>')  // Links internos
      .replace(/\[\[([^\]]+)\]\]/g, '<a href="/wiki/$1">$1</a>')  // Links internos simples
      .replace(/\{\{Infobox(.*?)\}\}/g, '<div class="infobox">$1</div>');  // Infobox simples
  };
  
  const renderContent = (content) => {
    return (
      <div dangerouslySetInnerHTML={{ __html: parseWikiContent(content) }} />
    );
  };

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="wiki-page">
      <h1>Esmeralda</h1>
      <div className="wiki-content">
        {renderContent(content)}
      </div>
    </div>
  );
};

export default WikiPage;
