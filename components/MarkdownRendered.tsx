/* eslint-disable react/display-name */
import { Code, Heading, HeadingProps, Text } from '@chakra-ui/react';
import React, { PropsWithChildren } from 'react';
import { Root } from 'remark-html';
import Link from './link';

type NodeType = {
    properties: { [key: string]: string };
    tagName?: string;
    type: string;
    value?: string;
};

// type keyable = {
//     key: Key | null | undefined;
// };

const GetComponent = (node?: NodeType) => {
    if (!node || !node.type) return null;
    switch (node.type) {
        case 'root':
            const root: React.FC<PropsWithChildren> = ({ children }) => <>{children}</>;
            return root;

        case 'paragraph':
            const paragraph: React.FC<PropsWithChildren> = ({ children }) => (
                <Text as="p">{children}</Text>
            );
            return paragraph;

        case 'emphasis':
            const emphasis: React.FC<PropsWithChildren> = ({ children }) => (
                <Text as="em">{children}</Text>
            );
            return emphasis;

        case 'strong':
            const strong: React.FC<PropsWithChildren> = ({ children }) => (
                <Text as="strong">{children}</Text>
            );
            return strong;

        case 'heading':
            const heading: React.FC<PropsWithChildren & { depth: number }> = ({
                children,
                depth = 2
            }) => {
                let as: HeadingProps['as'] = 'h2';
                switch (depth) {
                    case 1:
                        as = 'h1';
                    case 3:
                        as = 'h3';
                    case 4:
                        as = 'h4';
                    case 5:
                        as = 'h5';
                }

                return <Heading as={as}>{children}</Heading>;
            };
            return heading;

        case 'link':
            const link: React.FC<PropsWithChildren & { url: string }> = ({ children, url }) => (
                <Link href={url || ''} alt={`go to ${children}`}>
                    {children}
                </Link>
            );
            return link;

        case 'text':
            const text: React.FC<{ value: string }> = ({ value }) => <Text as="span">{value}</Text>;
            return text;

        case 'inlineCode':
            const inlineCode: React.FC<{ value: string }> = ({ value }) => (
                <Code whiteSpace="pre">{value}</Code>
            );
            return inlineCode;

        /* Handle all types here … */

        default:
            console.log('Unhandled node type', node);
            const defaultNode: React.FC<PropsWithChildren> = ({ children }) => <>{children}</>;
            return defaultNode;
    }
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const Node = (node: any) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const Component: any = GetComponent(node);
    const { children } = node;

    return children ? (
        <Component {...node}>
            {children.map((child: Root, index: number) => (
                <Node key={index} {...child} />
            ))}
        </Component>
    ) : (
        <Component {...node} />
    );
};

const MarkdownRenderer = ({ ast }: { ast: Root }) => <Node {...ast} />;

export default React.memo(MarkdownRenderer);
