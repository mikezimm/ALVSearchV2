import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField,
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import { IReadonlyTheme } from '@microsoft/sp-component-base';

import * as strings from 'AlvSearchHomeWebPartStrings';
import AlvSearchHome from './components/AlvSearchHome';
import { IAlvSearchHomeProps } from './components/IAlvSearchHomeProps';

export interface IAlvSearchHomeWebPartProps {
  redirectUrl: string;
  queryParam: string;
}

export default class AlvSearchHomeWebPart extends BaseClientSideWebPart<IAlvSearchHomeWebPartProps> {

  private _isDarkTheme: boolean = false;
  private _environmentMessage: string = '';

  public render(): void {
    const element: React.ReactElement<IAlvSearchHomeProps> = React.createElement(
      AlvSearchHome,
      {
        hasTeamsContext: !!this.context.sdks.microsoftTeams,
        redirectUrl: this.properties.redirectUrl,
        queryParam: this.properties.queryParam,
      }
    );

    ReactDom.render(element, this.domElement);
  }

  protected async onInit(): Promise<void> {
    // this._environmentMessage = this._getEnvironmentMessage();

    if ( !this.properties.redirectUrl ) this.properties.redirectUrl = `/sites/Lifenet/SitePages/Search-Center1.aspx`;
    if ( !this.properties.queryParam ) this.properties.queryParam = `?q={{SearchText}}`;
    return super.onInit().then(async _ => {
      //
    });

  }

  // private _getEnvironmentMessage(): string {
  //   if (!!this.context.sdks.microsoftTeams) { // running in Teams
  //     return this.context.isServedFromLocalhost ? strings.AppLocalEnvironmentTeams : strings.AppTeamsTabEnvironment;
  //   }

  //   return this.context.isServedFromLocalhost ? strings.AppLocalEnvironmentSharePoint : strings.AppSharePointEnvironment;
  // }

  protected onThemeChanged(currentTheme: IReadonlyTheme | undefined): void {
    if (!currentTheme) {
      return;
    }

    this._isDarkTheme = !!currentTheme.isInverted;
    const {
      semanticColors
    } = currentTheme;

    if (semanticColors) {
      this.domElement.style.setProperty('--bodyText', semanticColors.bodyText || null);
      this.domElement.style.setProperty('--link', semanticColors.link || null);
      this.domElement.style.setProperty('--linkHovered', semanticColors.linkHovered || null);
    }

  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('redirectUrl', {
                  label: `Redirect Url starting with /sites/`,
                  description: `Example: /sites/SiteCollection/SitePages/Search-Center1.aspx`
                }),
                PropertyPaneTextField('queryParam', {
                  label: `Redirect Url starting with /sites/`,
                  description: 'Example: ?q=${{SearchText}} - Replaces {{SearchText}} with text box value'
                }),
              ]
            }
          ]
        }
      ]
    };
  }
}
