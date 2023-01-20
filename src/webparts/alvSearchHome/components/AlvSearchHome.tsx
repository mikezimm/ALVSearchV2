import * as React from 'react';
import styles from './AlvSearchHome.module.scss';
import { IAlvSearchHomeProps, IAlvSearchHomeState } from './IAlvSearchHomeProps';
import { SearchBox } from 'office-ui-fabric-react/lib/SearchBox';
import * as strings from 'AlvSearchHomeWebPartStrings';

const tenant: string = window.location.hostname.toLowerCase().replace(`.sharepoint.com`, '' );
// const code: string = `vla`.split("").reverse().join("");

export default class AlvSearchHome extends React.Component<IAlvSearchHomeProps, IAlvSearchHomeState> {

  
  
 /***
*     .o88b.  .d88b.  d8b   db .d8888. d888888b d8888b. db    db  .o88b. d888888b  .d88b.  d8888b. 
*    d8P  Y8 .8P  Y8. 888o  88 88'  YP `~~88~~' 88  `8D 88    88 d8P  Y8 `~~88~~' .8P  Y8. 88  `8D 
*    8P      88    88 88V8o 88 `8bo.      88    88oobY' 88    88 8P         88    88    88 88oobY' 
*    8b      88    88 88 V8o88   `Y8b.    88    88`8b   88    88 8b         88    88    88 88`8b   
*    Y8b  d8 `8b  d8' 88  V888 db   8D    88    88 `88. 88b  d88 Y8b  d8    88    `8b  d8' 88 `88. 
*     `Y88P'  `Y88P'  VP   V8P `8888Y'    YP    88   YD ~Y8888P'  `Y88P'    YP     `Y88P'  88   YD 
*                                                                                                  
*                                                                                                  
*/


  public constructor(props:IAlvSearchHomeProps){
    super(props);

    this.state = {
        textSearch: '',
    };
  }

  public render(): React.ReactElement<IAlvSearchHomeProps> {
    const {
      hasTeamsContext,
    } = this.props;

    return (
      <section className={`${styles.alvSearchHome} ${hasTeamsContext ? styles.teams : ''}`}>
        <SearchBox
            value={ this.state.textSearch }
            styles={{ root: { maxWidth: '100%', height: '3em', fontSize: '18px' } }}
            placeholder={ strings.SearchPrompt }
            onSearch={ this._search.bind(this) }
            onFocus={ null }
            onBlur={ () => console.log('onBlur called') }
            onChange={ this._search.bind(this) }
            onKeyDown={(ev)=> { this._enter(ev.key)}}
          />
        <abbr title="Search (New) SharePoint Online">
          <button className={ styles.searchButton } onClick={ () => { this._buttonClick( ) }}>{ strings.SearchPrompt }
          </button></abbr>
      </section>
    );
  }

  private _search( event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, newValue: string ): void {

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    if ( event === this.state.textSearch as any && newValue === undefined ) {
      // This is likely an Enter key press... treat as such.
      window.open(`https://${tenant}.sharepoint.com/sites/Lifenet/SitePages/Search-Center1.aspx?q=${event}`, "_blank");

    } else {
      this.setState({ textSearch: newValue });
    }
  }

  private _buttonClick(): void {
    window.open(`https://${tenant}.sharepoint.com/sites/Lifenet/SitePages/Search-Center1.aspx?q=${this.state.textSearch}`, "_blank");
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private _enter(event: any, newValue?: string ): void {
    console.log( '_enter:', event , newValue );
  }

}
