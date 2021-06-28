# ccx

CCXは、SaaS型コードクローン分析システムです。
いろいろなコードクローン分析ツールをプラグインとして組み込むことにより、いろいろなツールを統一的に操作し、その結果を比較することができるようになります。
Webブラウザから、分析対象のレポジトリ、種々のパラメータを指定し、実行することで、分析ツール自体をローカルマシンにインストールすることなく利用できるようになります。

本レポジトリにはCCXのソースコードが置かれています。

大阪大学で運用しているCCXは、以下のURLから利用することができます。現在、この阪大CCXでは、CCFinderSW, CCFinderX, CCVolti, Deckard, NiCadの５種類の分析ツールを利用することができます。

[阪大CCXへのログイン](https://sel.ist.osaka-u.ac.jp/webapps/ccx/login)

CCXの使い方は以下のドキュメントを読んでください。

[使い方](/docs/usage.ja.md)

また、CCXに新たな分析ツールをプラグインとして追加するには以下のドキュメントを参照してください。

[pluginの仕様](/docs/plugin.ja.md)

CCXに関する研究論文などは以下を御覧ください。

- [松島 一樹, 井上 克郎: "高い拡張性を備えた SaaS 型コードクローン分析システムの提案", 信学技報, vol. 120, no. 82, SS2020-1, pp. 1-6, 2020年7月.,](https://sel.ist.osaka-u.ac.jp/lab-db/betuzuri/archive/1187/1187.pdf)
- [Kazuki Matsushima, Katsuro Inoue: "Comparison and Visualization of Code Clone Detection Results", Proceedings of the 2020 IEEE 14th International Workshop on Software Clones, London, Ontario, Canada, 2020-02.](https://sel.ist.osaka-u.ac.jp/lab-db/betuzuri/archive/1180/1180.pdf)
- [松島 一樹, 井上 克郎: "複数コードクローン検出結果の比較・表示ツール", SES2019, 2019-8.](https://sel.ist.osaka-u.ac.jp/lab-db/betuzuri/archive/1170/1170.pdf)

## CCX

CCX is a SaaS type code clone analysis system. By incorporating a variety of code clone analysis tools as plug-ins, you can utilize the various tools in a uniformed manner and compare the results. By specifying the target GitHub repository and various parameters from a web browser, the system can be used without installing the analysis tool itself on the local machine.

The source code of CCX is located in this repository.

The CCX operated at Osaka University can be used at the following URL. Currently, this Osaka University CCX provides five types of analysis tools: CCFinderSW, CCFinderX, CCVolti, Deckard, and NiCad.

[Log-in to the Osaka University CCX](https://sel.ist.osaka-u.ac.jp/webapps/ccx/login)

Please read this document for the usage of CCX.

[How to use CCX](/docs/usage.en.md)


Also, to add new analysis tools to CCX as plug-ins, please refer to the following document.

[Specification of the plugin (only Japanese)](/docs/plugin.ja.md)

For more information about CCX, please refer to the above paper.



