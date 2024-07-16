import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import '../style/mob.css';

const WikiPage = () => {
  const { itemName } = useParams();  
  const [content, setContent] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const response = await axios.get('https://minecraft.wiki/api.php', {
          params: {
            action: 'parse',
            format: 'json',
            formatversion: 2,
            prop: 'text',
            contentmodel: 'wikitext',
            disablelimitreport: 1,
            requestid: 'gadget-lazyloadSidebarVersions',
            page: itemName
          }
        });

        const content = response.data.parse.text;
        setContent(content);
      } catch (error) {
        console.error('Error fetching content:', error);
        setError('Ocorreu um erro ao buscar o conteúdo da página.');
      }
    };

    fetchContent();
  }, [itemName]);


  const parseWikiContent = (content) => {
    return content
      .replace(/==\s*(.*?)\s*==/g, '<h2>$1</h2>')
      .replace(/===\s*(.*?)\s*===/g, '<h3>$1</h3>')
      .replace(/====\s*(.*?)\s*====/g, '<h4>$1</h4>')
      .replace(/\[\[([^\|\]]+)\|([^\]]+)\]\]/g, '<a href="/wiki/$1">$2</a>')
      .replace(/\[\[([^\]]+)\]\]/g, '<a href="/wiki/$1">$1</a>')
      .replace(/\{\{Infobox(.*?)\}\}/g, '<div class="infobox">$1</div>');
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
      <h1>{itemName}</h1>
      <div className="wiki-content">
        {renderContent(content)}
      </div>
    </div>
  );
};

export default WikiPage;
