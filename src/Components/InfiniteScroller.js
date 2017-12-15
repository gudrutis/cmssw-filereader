import React, {Component} from "react";
import {List, AutoSizer, CellMeasurer, CellMeasurerCache} from "react-virtualized";

class InfiniteScroller extends Component {
    constructor(props) {
        super(props);
        this.cache = new CellMeasurerCache({
            fixedWidth: true,
            defaultHeight: 50
        });
        this.state = {
            currentLineSt: 50,
            currentLineEnd: 100,
        }
    }

    renderRow = ({index, parent, key, style}) => {
        let className = "code-line";
        if (this.state.currentLineSt <= index && this.state.currentLineEnd >= index) {
            className += " code-line-focus";
        }

        return (
            <CellMeasurer
                key={key}
                cache={this.cache}
                parent={parent}
                columnIndex={0}
                rowIndex={index}
            >
                <div style={style} className={className}>
                    <span className={"code-index"}><b>{index}: </b></span>
                    <span className={"code"} style={{whiteSpace: "pre-wrap"}}>{this.props.data[index]}</span>
                </div>
            </CellMeasurer>
        )
    };

    componentDidUpdate() {
        this.myInfiniteList.forceUpdateGrid();
        this.myInfiniteList.scrollToRow();
    }

    componentDidMount() {
        this.myInfiniteList.forceUpdateGrid();
        this.myInfiniteList.scrollToRow();
    }

    render() {
        return (
            <AutoSizer>
                {
                    ({width, height}) => {
                        return <List
                            ref={(ref) => this.myInfiniteList = ref}
                            rowCount={this.props.data.length}
                            width={width}
                            height={height}
                            deferredMeasurementCache={this.cache}
                            rowHeight={this.cache.rowHeight}
                            rowRenderer={this.renderRow}
                        />
                    }
                }
            </AutoSizer>
        );
    }
}

export default InfiniteScroller;